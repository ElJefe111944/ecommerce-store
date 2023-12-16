import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? 
JSON.parse(localStorage.getItem("cart")) : {cartItems: []};


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
        }
    }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;