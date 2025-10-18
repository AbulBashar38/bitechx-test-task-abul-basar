"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/services/productApi";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
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

export const DUMMY_PRODUCTS: Product[] = [
  {
    category: {
      createdAt: "2025-09-30T11:07:09.824206+00:00",
      description: null,
      id: "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      name: "Clothes",
      updatedAt: "2025-09-30T11:07:09.824206+00:00",
    },
    createdAt: "2025-09-29T11:09:16.110463+00:00",
    description: "test product description",
    id: "0133b509-e436-4a14-b5c4-91b2a19aadc4",
    images: ["https://laravelpoint.com/files/p_img.jpg"],
    name: "test product 1133",
    price: 1000,
    slug: "test-product-1133",
    updatedAt: "2025-09-30T11:09:16.110463+00:00",
  },
  {
    category: {
      createdAt: "2025-09-30T11:07:09.824206+00:00",
      description: null,
      id: "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      name: "Clothes",
      updatedAt: "2025-09-30T11:07:09.824206+00:00",
    },
    createdAt: "2025-09-29T11:09:16.110463+00:00",
    description: "test product description",
    id: "0133b509-e436-4a14-b5c4-91b2a19aadc4",
    images: ["https://laravelpoint.com/files/p_img.jpg"],
    name: "test product 1133",
    price: 1000,
    slug: "test-product-1133",
    updatedAt: "2025-09-30T11:09:16.110463+00:00",
  },
  {
    category: {
      createdAt: "2025-09-30T11:07:09.824206+00:00",
      description: null,
      id: "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      name: "Clothes",
      updatedAt: "2025-09-30T11:07:09.824206+00:00",
    },
    createdAt: "2025-09-29T11:09:16.110463+00:00",
    description: "test product description",
    id: "0133b509-e436-4a14-b5c4-91b2a19aadc4",
    images: ["https://laravelpoint.com/files/p_img.jpg"],
    name: "test product 1133",
    price: 1000,
    slug: "test-product-1133",
    updatedAt: "2025-09-30T11:09:16.110463+00:00",
  },
  {
    category: {
      createdAt: "2025-09-30T11:07:09.824206+00:00",
      description: null,
      id: "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      name: "Clothes",
      updatedAt: "2025-09-30T11:07:09.824206+00:00",
    },
    createdAt: "2025-09-29T11:09:16.110463+00:00",
    description: "test product description",
    id: "0133b509-e436-4a14-b5c4-91b2a19aadc4",
    images: ["https://laravelpoint.com/files/p_img.jpg"],
    name: "test product 1133",
    price: 1000,
    slug: "test-product-1133",
    updatedAt: "2025-09-30T11:09:16.110463+00:00",
  },
  {
    category: {
      createdAt: "2025-09-30T11:07:09.824206+00:00",
      description: null,
      id: "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      name: "Clothes",
      updatedAt: "2025-09-30T11:07:09.824206+00:00",
    },
    createdAt: "2025-09-29T11:09:16.110463+00:00",
    description: "test product description",
    id: "0133b509-e436-4a14-b5c4-91b2a19aadc4",
    images: ["https://laravelpoint.com/files/p_img.jpg"],
    name: "test product 1133",
    price: 1000,
    slug: "test-product-1133",
    updatedAt: "2025-09-30T11:09:16.110463+00:00",
  },
  {
    category: {
      createdAt: "2025-09-30T11:07:09.824206+00:00",
      description: null,
      id: "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      name: "Clothes",
      updatedAt: "2025-09-30T11:07:09.824206+00:00",
    },
    createdAt: "2025-09-29T11:09:16.110463+00:00",
    description: "test product description",
    id: "0133b509-e436-4a14-b5c4-91b2a19aadc4",
    images: ["https://laravelpoint.com/files/p_img.jpg"],
    name: "test product 1133",
    price: 1000,
    slug: "test-product-1133",
    updatedAt: "2025-09-30T11:09:16.110463+00:00",
  },
];

export default function ProductsPage() {
  const { data: allProducts } = useGetProductsQuery();
  console.log({ allProducts });

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, products]);

  function fetchProducts() {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      setTimeout(() => {
        setProducts(DUMMY_PRODUCTS);
        setFilteredProducts(DUMMY_PRODUCTS);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      setLoading(false);
    }
  }

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <ErrorMessage message={error} />
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
                    Discover our curated collection of {filteredProducts.length}{" "}
                    premium products
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>
        </div>

        {currentProducts.length === 0 ? (
          <div className="flex min-h-[50vh] items-center justify-center rounded-3xl border-2 border-dashed border-muted bg-muted/5 animate-fade-in">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Sparkles className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">No products found</p>
              <p className="mt-2 text-base text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "No products available at the moment"}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentProducts.map((product, index) => (
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
                  disabled={currentPage === 1}
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
                  disabled={currentPage === totalPages}
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
