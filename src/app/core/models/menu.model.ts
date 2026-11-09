export interface ProductPortion {
  name: string;
  price: number;
}

export interface ProductOptionItem {
  name: string;
  price?: number | null;
}

export interface ProductOptionGroup {
  name: string;
  required?: boolean;
  items: ProductOptionItem[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  calories?: number;
  preparationTime?: string;
  isAvailable?: boolean;
  badge?: string;        // "Yeni", "Popüler", "Şefin Seçimi" vs.
  allergens?: string[];  // Alerjen bilgisi
  portions?: ProductPortion[];
  options?: ProductOptionGroup[];
  ingredients?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon?: string;         // Emoji veya metin
  imageUrl?: string;
  displayOrder: number;
  products: Product[];
}

export interface MenuResponse {
  restaurantName: string;
  restaurantLogo?: string;
  currency: string;      // "₺", "€", "$" vs.
  categories: Category[];
}
