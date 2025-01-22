import {
  CartItem,
  Discount,
  ShippingRule,
  CartTotals,
} from "../types/ShoppingCart";
import {
  calculateTotalCount,
  calculateTotalPrice,
} from "../utils/calculateTotal";

export const useCartCalculations = (
  items: CartItem[],
  taxRate: number,
  shippingRules: ShippingRule[],
  appliedDiscount?: Discount
) => {
  const totalCountOfProducts: number = calculateTotalCount(items);
  let subtotal: number = calculateTotalPrice(items);
  let discount: number = 0;
  let shipping: number = 5;
  let tax: number = 0;
  let total: number = 0;
  let isValid: boolean = false;

  switch (appliedDiscount?.code) {
    case "initial":
      break;

    case "SAVE10":
      discount = subtotal * (appliedDiscount.value / 100);
      break;

    case "MINUS5":
      discount = appliedDiscount.value;
      break;

    default:
      break;
  };

  // не уверена 
  shipping = shippingRules.reduce((acc, rule) => {
    if(totalCountOfProducts < rule.minOrderValue) {
      acc = 5; 
    } else {
      acc = 0;
    };

    return acc;
  }, 0);


  tax = subtotal * taxRate;
  total = subtotal - discount + tax + shipping;

  if (total < 0) {
    isValid = true;
  };

  return {
    totals: {
      subtotal,
      discount,
      tax,
      shipping,
      total,
    } as CartTotals,
    isValid,
  };
};
