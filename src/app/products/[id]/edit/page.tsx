"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetProductsBySlugQuery } from "@/services/productApi";
import { useParams } from "next/navigation";
import { ProductForm } from "../../components/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsBySlugQuery(params.id);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-10 flex flex-col justify-center items-center w-full">
        <div className="container">
          <ErrorMessage message={error?.message || "Product not found"} />
        </div>
      </div>
    );
  }

  return <ProductForm product={product} mode="edit" />;
}
