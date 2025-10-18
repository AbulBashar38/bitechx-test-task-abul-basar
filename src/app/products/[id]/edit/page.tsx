"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
// import { supabase, Product } from '@/lib/supabase';
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProductForm } from "../../components/ProductForm";
import { DUMMY_PRODUCTS, Product } from "../../page";

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(DUMMY_PRODUCTS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (params.id) {
  //     fetchProduct(params.id as string);
  //   }
  // }, [params.id]);

  // async function fetchProduct(id: string) {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const { data, error: fetchError } = await supabase
  //       .from('products')
  //       .select('*')
  //       .eq('id', id)
  //       .maybeSingle();

  //     if (fetchError) throw fetchError;

  //     if (!data) {
  //       setError('Product not found');
  //       return;
  //     }

  //     setProduct(data);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to fetch product');
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-10">
        <div className="container">
          <ErrorMessage message={error || "Product not found"} />
        </div>
      </div>
    );
  }

  return <ProductForm product={product} mode="edit" />;
}
