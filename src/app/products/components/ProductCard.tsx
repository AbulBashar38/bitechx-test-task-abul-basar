"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getValidImageUrl } from "@/lib/utils";
import { useState } from "react";
import { Product } from "../page";

interface ProductCardProps {
  product: Product;
  onDelete?: (product: Product) => void;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-elegant transition-all duration-500 hover:shadow-elegant-lg animate-scale-in">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

      <CardHeader className="p-0">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-muted to-muted/50">
          <div className="absolute right-3 top-3 z-10 flex gap-2">
            {product.category && (
              <Badge
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm border-0 shadow-lg font-medium"
              >
                {product.category.name}
              </Badge>
            )}
          </div>

          <Image
            src={getValidImageUrl(product.images?.[0]) || "/placeholder.jpg"}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${
              imageLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
            <div className="flex gap-2">
              <Link href={`/products/${product.slug}`} className="flex-1">
                <Button
                  variant="secondary"
                  className="w-full bg-white/95 backdrop-blur-sm hover:bg-white border-0 shadow-lg font-medium"
                  size="sm"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-lg font-bold leading-tight transition-colors group-hover:text-primary">
              {product.name}
            </h3>
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium">
                Price
              </span>
              <span className="text-2xl font-bold text-gradient">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-1 text-accent">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 border-t bg-muted/30 p-4">
        <Link href={`/products/${product.slug}`} className="flex-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full font-medium transition-all hover:bg-secondary hover:text-secondary-foreground hover:border-secondary cursor-pointer"
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
