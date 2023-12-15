import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? 
JSON.parse(localStorage.getItem("cart")) : {cartItems: []};

// helper function 
// all digits to 2sf
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const cartItem = action.payload;
            // if item already exists in local storage 
            const existingItem = state.cartItems.find((item) => item._id === cartItem._id);

            if(existingItem){
                state.cartItems = state.cartItem.map((item) => item._id === existingItem._id ? cartItem : item)
            } else {
                // make copy of array and add new item
                state.cartItems = [...state.cartItems, cartItem];
            }

            // calculate all cart items price 
            state.cartItemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)); 
            // calculate shipping price (if order is over £100 then free, else standard £10)
            state.shippingPrice = addDecimals(state.cartItemsPrice > 100 ? 0 : 10);
            // calculate tax price (15% tax)
            state.taxPrice = addDecimals(Number((0.15) * state.cartItemsPrice).toFixed(2));
            // calculate total price 
            state.totalPrice = (Number(state.cartItemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

            // save to localstorage
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;