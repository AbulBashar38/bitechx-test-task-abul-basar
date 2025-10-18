import apiConfig from "./apiConfig";
import { ENDPOINT } from "./endpoint";
const addTagTypes = ["product", "categories"];
const productApi = apiConfig.enhanceEndpoints({ addTagTypes }).injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: ENDPOINT.PRODUCTS,
        params,
      }),
      providesTags: ["product"],
    }),
    getCategories: builder.query({
      query: (params) => ({
        url: ENDPOINT.CATEGORIES,
        params,
      }),
      providesTags: ["categories"],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: ENDPOINT.PRODUCTS,
        method: "POST",
        body,
      }),
      invalidatesTags: ["product"],
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

export const {
  useGetProductsQuery,
  useLoginMutation,
  useGetCategoriesQuery,
  useCreateProductMutation,
} = productApi;
