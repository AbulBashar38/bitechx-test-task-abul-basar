import type {
  Category,
  CreateProductPayload,
  Product,
  QueryType,
} from "@/type";
import apiConfig from "./apiConfig";
import { ENDPOINT } from "./endpoint";
const addTagTypes = ["product", "categories"];
const productApi = apiConfig.enhanceEndpoints({ addTagTypes }).injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], QueryType>({
      query: (params) => ({
        url: ENDPOINT.PRODUCTS,
        params,
      }),
      providesTags: ["product"],
    }),
    getProductsBySlug: builder.query<Product, string>({
      query: (slug) => ({
        url: `${ENDPOINT.PRODUCTS}/${slug}`,
      }),
    }),
    getCategories: builder.query<Category[], QueryType>({
      query: (params) => ({
        url: ENDPOINT.CATEGORIES,
        params,
      }),
      providesTags: ["categories"],
    }),
    createProduct: builder.mutation<Product, CreateProductPayload>({
      query: (body) => ({
        url: ENDPOINT.PRODUCTS,
        method: "POST",
        body,
      }),
      invalidatesTags: ["product"],
    }),
    login: builder.mutation<{ token: string }, { email: string }>({
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
  useGetProductsBySlugQuery,
} = productApi;
