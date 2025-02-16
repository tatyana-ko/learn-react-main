export interface Product {
  id: string;
  name: string;
  price: number;
  weight: number;
  stock: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Discount {
  type: "percentage" | "fixed";
  value: number;
  code: string;
}

export interface ShippingRule {
  minOrderValue: number;
  cost: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface CartState {
  items: CartItem[];
  appliedDiscount?: Discount;
}

export interface ShoppingCartProps {
  taxRate: number;
  shippingRules: ShippingRule[];
  discounts: Discount[];
  minimumOrderValue: number;
  onCheckout?: (totals: CartTotals, items: CartItem[]) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalCountOfProducts: number;
}
