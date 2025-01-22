import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "../types/ShoppingCart";

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = state.items.find((item) => item.id === action.payload.id);

      if (!product) {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        product.quantity += 1;
      }
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.items.find((item) => item.id === action.payload);

      if(!product) {
        return;
      };

      product.quantity += 1;
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.items.find((item) => item.id === action.payload);

      if(!product) {
        return;
      };

      product.quantity -= 1;
    },

    removeAllProducts: (state) => {
      state.items = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  removeAllProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
