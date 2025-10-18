import apiConfig from "./apiConfig";
import { ENDPOINT } from "./endpoint";
const addTagTypes = ["product"];
const productApi = apiConfig.enhanceEndpoints({ addTagTypes }).injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ENDPOINT.PRODUCTS,
      providesTags: ["product"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
