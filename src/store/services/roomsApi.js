// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import absoluteUrl from "next-absolute-url";

// Define a service using a base URL and expected endpoints
export const roomsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  reducerPath: "roomsApi",
  endpoints: (builder) => ({
    //get all rooms
    getRooms: builder.query({
      query: () => `/rooms`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetRoomsQuery } = roomsApi;
