"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormData, productSchema } from "@/lib/validations";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useGetCategoriesQuery,
} from "@/services/productApi";
import { Product } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DollarSign,
  FileText,
  Image as ImageIcon,
  Loader2,
  Package,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const { data: categories, isLoading: categoryLoading } =
    useGetCategoriesQuery({});
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [editProduct, { isLoading: editLoading }] = useEditProductMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: product?.category.id || "",
          imageUrl: product.images[0] || "",
        }
      : undefined,
  });

  const categoryId = watch("categoryId");

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // async function fetchCategories() {
  //   try {
  //     setLoading(true);
  //     const { data, error: fetchError } = await supabase
  //       .from('categories')
  //       .select('*')
  //       .order('name');

  //     if (fetchError) throw fetchError;
  //     setCategories(data || []);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to fetch categories');
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function onSubmit(data: ProductFormData) {
    try {
      const productData = {
        name: data.name,
        description: data.description,
        images: [data.imageUrl],
        price: data.price,
        categoryId: data.categoryId,
      };

      if (mode === "edit" && product) {
        await editProduct({ id: product.id, body: productData }).unwrap();
      } else {
        await createProduct(productData).unwrap();
      }

      toast.success(
        mode === "create"
          ? "Product created successfully"
          : "Product updated successfully"
      );

      router.push("/products");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : `Failed to ${mode} product`
      );
    }
  }

  if (categoryLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-10">
      <div className="container">
        <Card className="mx-auto max-w-3xl border-0 shadow-elegant-lg animate-scale-in">
          <CardHeader className="space-y-1 border-b bg-gradient-to-br from-accent/5 to-primary/5 pb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">
                  {mode === "create" ? "Create New Product" : "Edit Product"}
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mode === "create"
                    ? "Add a new product to your collection"
                    : "Update product information"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-3">
                <Label
                  htmlFor="name"
                  className="flex items-center gap-2 text-base font-semibold"
                >
                  <Package className="h-4 w-4 text-accent" />
                  Product Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter a compelling product name"
                  className="h-12 text-base"
                />
                {errors.name && (
                  <p className="flex items-center gap-1 text-sm font-medium text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="description"
                  className="flex items-center gap-2 text-base font-semibold"
                >
                  <FileText className="h-4 w-4 text-accent" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe your product in detail..."
                  rows={5}
                  className="text-base resize-none"
                />
                {errors.description && (
                  <p className="flex items-center gap-1 text-sm font-medium text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-3">
                  <Label
                    htmlFor="price"
                    className="flex items-center gap-2 text-base font-semibold"
                  >
                    <DollarSign className="h-4 w-4 text-accent" />
                    Price
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register("price", { valueAsNumber: true })}
                      placeholder="0.00"
                      className="h-12 pl-8 text-base"
                    />
                  </div>
                  {errors.price && (
                    <p className="flex items-center gap-1 text-sm font-medium text-destructive">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="category"
                    className="flex items-center gap-2 text-base font-semibold"
                  >
                    <Tag className="h-4 w-4 text-accent" />
                    Category
                  </Label>
                  <Select
                    value={categoryId}
                    onValueChange={(value) => setValue("categoryId", value)}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="text-base"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="flex items-center gap-1 text-sm font-medium text-destructive">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="imageUrl"
                  className="flex items-center gap-2 text-base font-semibold"
                >
                  <ImageIcon className="h-4 w-4 text-accent" />
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  {...register("imageUrl")}
                  placeholder="https://example.com/image.jpg"
                  className="h-12 text-base"
                />
                {errors.imageUrl && (
                  <p className="flex items-center gap-1 text-sm font-medium text-destructive">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading || editLoading}
                  size="lg"
                  className="flex-1 font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || editLoading}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 shadow-lg transition-all hover:shadow-xl font-semibold"
                >
                  {(isLoading || editLoading) && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  {mode === "create" ? "Create Product" : "Update Product"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
