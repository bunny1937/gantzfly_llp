export type ProductCategory = "spices" | "makhana" | "dry-fruits";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  origin: string;
  grade: string;
  shortDescription: string;
  description: string;
  packagingOptions: string[];
  moq: string;
  moqUnit: string;
  certifications: string[];
  tags: string[];
  exportMarkets: string[];
  featured: boolean;
  image: string;
  badge?: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  packaging: string;
  notes?: string;
}

export interface QuoteRequestItem {
  product: {
    name: string;
    grade: string;
    moqUnit: string;
  };
  quantity: string | number;
  packaging: string;
  notes?: string;
}

export interface BuyerForm {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  notes?: string;
}
