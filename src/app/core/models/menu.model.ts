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
