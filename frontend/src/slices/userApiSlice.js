import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        })
    }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = usersApiSlice;