import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../interface/BookInterface";

export interface CartItem {
  id: number; // matches bookId for convenience
  bookId: number;
  title: string;
  price: number;
  discount: number;
  source: any;
  quantity: number;
  author: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [
    {
      id: 1,
      bookId: 1,
      source: require("../../assets/biasach.jpg"),
      title: "Săn cá thần",
      author: "Đặng Thiều Quang",
      price: 200000,
      discount: 20,
      quantity: 1,
    },
    {
      id: 2,
      bookId: 2,
      source: require("../../assets/biasach.jpg"),
      title: "Dế Mèn Phiêu Lưu Ký",
      author: "Tô Hoài",
      price: 150000,
      discount: 10,
      quantity: 2,
    },
    {
      id: 3,
      bookId: 3,
      source: require("../../assets/biasach.jpg"),
      title: "Số Đỏ",
      author: "Vũ Trọng Phụng",
      price: 180000,
      discount: 15,
      quantity: 1,
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ book: Book; quantity?: number }>
    ) => {
      const { book, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.bookId === book.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: book.id,
          bookId: book.id,
          title: book.title,
          price: book.price,
          discount: book.discount,
          source: book.source,
          quantity: quantity,
          author: book.author,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.bookId !== action.payload && item.id !== action.payload
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ bookId: number; quantity: number }>
    ) => {
      const { bookId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.bookId !== bookId);
      } else {
        const item = state.items.find((item) => item.bookId === bookId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.bookId === action.payload || item.id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.bookId === action.payload || item.id === action.payload
      );
      if (itemIndex > -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectTotalQuantity = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalAmount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
