// helper function 
// all digits to 2sf
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
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

    return state;
};