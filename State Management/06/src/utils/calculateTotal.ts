import { CartItem } from "../types/ShoppingCart";

export const calculateTotalCount = (items: CartItem[]) => {
  return items.reduce((amount: number, item: CartItem) => amount + item.quantity, 0);
};

export const calculateTotalPrice = (items: CartItem[]) => {
  return items.reduce((amount: number, item: CartItem) => amount + item.price * item.quantity, 0);
}