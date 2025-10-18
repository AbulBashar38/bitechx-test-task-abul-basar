import apiConfig from "./apiConfig";
import { ENDPOINT } from "./endpoint";
const addTagTypes = ["product"];
const productApi = apiConfig.enhanceEndpoints({ addTagTypes }).injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ENDPOINT.PRODUCTS,
      providesTags: ["product"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: ENDPOINT.AUTH,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useLoginMutation } = productApi;
