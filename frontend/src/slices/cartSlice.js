import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? 
JSON.parse(localStorage.getItem("cart")) : {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const cartItem = action.payload;
            // if item already exists in local storage 
            const existingItem = state.cartItems.find((item) => item._id === cartItem._id);

            if(existingItem){
                state.cartItems = state.cartItems.map((item) => item._id === existingItem._id ? cartItem : item)
            } else {
                // make copy of array and add new item
                state.cartItems = [...state.cartItems, cartItem];
            }
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            // ID of item to be removed
            // return all items except the item with the ID to be removed 
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload );

            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        }
    }
});

export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;