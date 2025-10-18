import type { RootState } from "@/state-management/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // By using `getState`, you can access the entire Redux store's state
    const token = (getState() as RootState).auth.token; // 👈 Get token from state

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const apiConfig = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["product"], // It's good practice to define tagTypes here
  endpoints: () => ({}),
});

export default apiConfig;
