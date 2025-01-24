import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "api", 
  baseQuery: fetchBaseQuery({
    baseUrl: "https://demo.pixx.com.my/public/api", 
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login", 
        method: "POST",
        body:credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = AuthApi; 
