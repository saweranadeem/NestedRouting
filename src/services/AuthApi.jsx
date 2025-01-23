import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "api", // Unique key for your API slice
  baseQuery: fetchBaseQuery({
    baseUrl: "https://demo.pixx.com.my/public/api", // Your base URL for API requests
  }),
  endpoints: (builder) => ({
    login: builder.query({
      query: () => ({
        url: "/login", // Endpoint to make the GET request
        method: "GET", // Specify the method (GET in this case)
      }),
    }),
  }),
});

export const { useLoginQuery } = AuthApi; // Generate hook for use in your component
