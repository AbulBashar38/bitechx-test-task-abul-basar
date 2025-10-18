export interface Category {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface CreateProductPayload {
  categoryId: string;
  description: string;
  images: string[];
  name: string;
  price: number;
}

export interface QueryType {
  offset?: number;
  limit?: number;
  categoryId?: string;
  searchedText?: string;
}
export interface mutationQueryType {
  id: string;
  body: CreateProductPayload;
}

export interface GetProductsArgs {
  page?: number;
  limit?: number;
  searchedText?: string;
  categoryId?: string;
}
