"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getValidImageUrl } from "@/lib/utils";
import {
  useDeleteProductMutation,
  useGetProductsBySlugQuery,
} from "@/services/productApi";
import {
  ArrowLeft,
  Calendar,
  Info,
  Package,
  Pencil,
  Star,
  Tag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsBySlugQuery(params.id as string);
  console.log(product);

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  async function handleDelete() {
    if (!product) return;

    try {
      await deleteProduct(product.id).unwrap();

      toast.success("Product deleted successfully");
      setDeleteModalOpen(false);
      router.push("/products");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete product"
      );
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-8">
        <ErrorMessage
          message={
            error ? "Failed to fetch product details" : "Product not found"
          }
        />
        <Link href="/products" className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-10">
        <div className="mb-8 animate-slide-up">
          <Link href="/products">
            <Button variant="ghost" size="lg" className="group -ml-4">
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Back to Gallery
            </Button>
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-5 animate-fade-in">
          <div className="lg:col-span-2">
            <Card className="sticky top-24 overflow-hidden border-0 shadow-elegant-lg">
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                <Image
                  src={getValidImageUrl(product?.images?.[0])}
                  alt={product?.name || "Product image"}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              <div className="p-6 bg-gradient-to-br from-accent/5 to-primary/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    4.0 / 5.0
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-8 lg:col-span-3">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-5xl font-bold leading-tight tracking-tight">
                    {product.name}
                  </h1>
                  <p className="mt-3 text-lg text-muted-foreground">
                    Premium quality product from our collection
                  </p>
                </div>
                {product.category && (
                  <Badge
                    variant="secondary"
                    className="shrink-0 border-0 bg-gradient-to-br from-accent/20 to-primary/20 px-4 py-2 text-base font-semibold shadow-md"
                  >
                    <Tag className="mr-2 h-4 w-4" />
                    {product.category.name}
                  </Badge>
                )}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-bold text-gradient">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">
                  20% OFF
                </Badge>
              </div>
            </div>

            <Card className="border-0 shadow-elegant">
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-accent" />
                  <h2 className="text-2xl font-bold">Product Description</h2>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center gap-2">
                  <Package className="h-5 w-5 text-accent" />
                  <h2 className="text-2xl font-bold">Product Information</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Package className="h-4 w-4" />
                      Product ID
                    </div>
                    <p className="font-mono text-sm text-foreground">
                      {product.id.slice(0, 8)}...
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Tag className="h-4 w-4" />
                      Category
                    </div>
                    <p className="text-sm text-foreground">
                      {product.category?.name || "Uncategorized"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Created Date
                    </div>
                    <p className="text-sm text-foreground">
                      {new Date(product.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Last Updated
                    </div>
                    <p className="text-sm text-foreground">
                      {new Date(product.updatedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Link href={`/products/${product?.slug}/edit`} className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground shadow-lg transition-all hover:shadow-xl font-semibold text-base"
                >
                  <Pencil className="mr-2 h-5 w-5" />
                  Edit Product
                </Button>
              </Link>
              <Button
                size="lg"
                variant="destructive"
                onClick={() => setDeleteModalOpen(true)}
                className="flex-1 shadow-lg transition-all hover:shadow-xl font-semibold text-base"
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDelete}
        productName={product?.name}
        isLoading={deleteLoading}
      />
    </div>
  );
}
