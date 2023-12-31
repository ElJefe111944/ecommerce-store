import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            }),
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5
        })
    }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice;