"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
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
import { ChevronLeft, ChevronRight, Filter, Sparkles } from "lucide-react";
import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced search function
  const debouncedSearch = useDebounce((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  }, 500);

  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery({});

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery({
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE,
    searchedText: searchQuery,
    categoryId: selectedCategory === "all" ? "" : selectedCategory,
  });
  console.log(productsData);

  const products = productsData || [];
  const totalCount = productsData?.total || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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

        {products.length === 0 ? (
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
              {products.map((product, index) => (
                <div
                  key={product.id}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3 animate-fade-in">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || isLoading}
                  className="font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page: number;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="lg"
                        onClick={() => setCurrentPage(page)}
                        disabled={isLoading}
                        className={`min-w-[3rem] font-semibold transition-all ${
                          currentPage === page
                            ? "bg-gradient-to-r from-accent to-primary shadow-md"
                            : "shadow-sm hover:shadow-md"
                        }`}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages || isLoading}
                  className="font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  Next
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
