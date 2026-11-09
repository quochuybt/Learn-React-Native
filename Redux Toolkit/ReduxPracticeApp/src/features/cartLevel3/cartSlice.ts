import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../../utils/storage';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  discountCode: string | null;
  taxRate: number; // 10% = 0.1
  shippingCost: number; // Mặc định 10
}

const initialState: CartState = {
  items: [
    {
      id: 1,
      name: 'MacBook Pro M3 14"',
      price: 1999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300',
    },
  ],
  discountCode: null,
  taxRate: 0.1,
  shippingCost: 10,
};

const saveToStorage = (items: CartItem[]) => {
  storage.setItem('cart_items_v3', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ (nếu có rồi tăng số lượng, chưa có thì gán quantity = 1)
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
      saveToStorage(state.items);
    },

    // Tăng số lượng
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveToStorage(state.items);
      }
    },

    // Giảm số lượng
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveToStorage(state.items);
      }
    },

    // Xóa sản phẩm khỏi giỏ
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToStorage(state.items);
    },

    // Xóa toàn bộ giỏ
    clearCart: (state) => {
      state.items = [];
      saveToStorage(state.items);
    },

    // Áp dụng mã giảm giá (SUMMER10, SPECIAL20)
    applyDiscount: (state, action: PayloadAction<string | null>) => {
      state.discountCode = action.payload;
    },

    // Đặt phí vận chuyển
    setShippingCost: (state, action: PayloadAction<number>) => {
      state.shippingCost = action.payload;
    },

    // Nạp lại dữ liệu từ storage
    loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  setShippingCost,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;

