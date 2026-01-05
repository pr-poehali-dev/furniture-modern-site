export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  material: string;
  style: string;
  color: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Filters {
  priceRange: [number, number];
  materials: string[];
  styles: string[];
  colors: string[];
}
