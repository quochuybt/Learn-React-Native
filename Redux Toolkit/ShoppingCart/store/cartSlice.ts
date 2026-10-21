import { createSlice } from "@reduxjs/toolkit"

export interface CartItem {
    id:number,
    name:string,
    price:number,
    quantity:number
}

interface CartState {
    items: CartItem[]
}

const initialState:CartState = {
    items:[]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    addToCart: (state,action) => {
        const product = action.payload;
        const index = state.items.findIndex(
          (item) => item.id === product.id
        );
  
        if (index >= 0) {
          state.items[index].quantity += 1;
        } else {
          state.items.push({
            ...product,
            quantity: 1,
          });
        }
      },
      removeFromCart: (state,action) => {
        const id = action.payload;
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      },
      updateQuantity: (state,action) => {
        const { id, quantity } = action.payload;
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== id
          );
          return;
        }
        const index = state.items.findIndex(
          (item) => item.id === id
        );
        if (index >= 0) {
          state.items[index].quantity = quantity;
        }
      },
      clearCart: (state) => {
        state.items = [];
      },
    },
  });

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;