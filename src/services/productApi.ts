import type {
  Category,
  CreateProductPayload,
  GetProductsArgs,
  mutationQueryType,
  Product,
  QueryType,
} from "@/type";
import apiConfig from "./apiConfig";
import { ENDPOINT } from "./endpoint";

const addTagTypes = ["product", "categories"];

const productApi = apiConfig.enhanceEndpoints({ addTagTypes }).injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProductsArgs>({
      // 1. The query now accepts all parameters
      query: ({ page = 1, limit = 10, searchedText, categoryId }) => {
        const offset = (page - 1) * limit;

        // Build query parameters dynamically
        const params = new URLSearchParams({
          offset: offset.toString(),
          limit: limit.toString(),
        });
        if (searchedText) {
          params.append("searchedText", searchedText);
        }
        if (categoryId) {
          params.append("categoryId", categoryId);
        }

        return `${ENDPOINT.PRODUCTS}${
          searchedText?.length ? "/search?" : "?"
        }${params.toString()}`;
      },

      // 2. THIS IS THE KEY CHANGE: Create a unique cache key for each filter combination
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        const { searchedText, categoryId } = queryArgs;
        // The key includes the endpoint name, search text, and category
        // It deliberately EXCLUDES `page` so that all pages for the same
        // search/filter are stored in the same cache entry.
        return `${endpointName}-${searchedText}-${categoryId}`;
      },

      // 3. The merge logic remains the same
      merge: (currentCache, newItems) => {
        // Prevent duplicates in case of refetches
        console.log({ newItems });

        const uniqueNewItems = newItems.filter(
          (newItem) =>
            !currentCache.some((existingItem) => existingItem.id === newItem.id)
        );
        currentCache.push(...uniqueNewItems);
      },

      // 4. Force refetch logic also remains the same
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
    editProduct: builder.mutation<Product, mutationQueryType>({
      query: ({ id, body }) => ({
        url: `${ENDPOINT.PRODUCTS}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation<Product, string>({
      query: (id) => ({
        url: `${ENDPOINT.PRODUCTS}/${id}`,
        method: "DELETE",
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
  useDeleteProductMutation,
  useEditProductMutation,
} = productApi;
