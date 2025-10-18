"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/services/productApi";
import { Filter, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { SearchBar } from "./components/SearchBar";

type Category = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  images: string[];
  category: Category;
  createdAt: string;
  updatedAt: string;
};

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Debounced search function
  const searchFunction = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when searching
    setHasMore(true);
  };
  // @ts-expect-error TypeScript strictness with function parameter names
  const debouncedSearch = useDebounce(searchFunction, 500);

  // Reset page and hasMore when category changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [selectedCategory, searchQuery]);

  const categoryId = selectedCategory === "all" ? "" : selectedCategory;

  const { data: categoryData } = useGetCategoriesQuery({});

  const {
    data: productsData,
    isLoading,
    error,
    isFetching,
  } = useGetProductsQuery({
    page,
    limit: ITEMS_PER_PAGE,
    searchedText: searchQuery,
    categoryId: categoryId,
  });
  console.log(productsData);

  const products = productsData?.products || [];
  const totalCount = productsData?.total || 0;

  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  useEffect(() => {
    if (
      productsData &&
      productsData.products?.length >= (productsData.total || 0)
    ) {
      setHasMore(false);
    }
  }, [productsData]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <ErrorMessage message="Failed to fetch products" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col justify-center items-center">
      <div className="container py-10">
        <div className="mb-10 animate-slide-up">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-primary shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-gradient">
                    Product Gallery
                  </h1>
                  <p className="mt-1 text-base text-muted-foreground">
                    Discover our curated collection of {totalCount || 0} premium
                    products
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchBar
                value={searchQuery}
                onChange={debouncedSearch}
                placeholder="Search products..."
              />
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categoryData?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {products?.length === 0 ? (
          <div className="flex min-h-[50vh] items-center justify-center rounded-3xl border-2 border-dashed border-muted bg-muted/5 animate-fade-in">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Sparkles className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">No products found</p>
              <p className="mt-2 text-base text-muted-foreground">
                {searchQuery || selectedCategory
                  ? "Try adjusting your search terms or filters"
                  : "No products available at the moment"}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products?.map((product, index) => (
                <div
                  key={product.id}
                  ref={
                    index === products?.length - 1
                      ? lastProductElementRef
                      : null
                  }
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Infinite scroll loading */}
            {isFetching && hasMore && (
              <div className="flex justify-center py-8">
                <LoadingSpinner size={32} />
              </div>
            )}
            {!hasMore && products?.length > 0 && (
              <div className="flex justify-center py-8">
                <p className="text-muted-foreground">
                  No more products to load
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
