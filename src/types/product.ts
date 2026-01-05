export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  material: string;
  style: string;
  color: string;
  description: string;
  manufacturer: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Filters {
  priceRange: [number, number];
  categories: string[];
  materials: string[];
  colors: string[];
}