import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../interface/BookInterface";

interface WishlistState {
  items: Book[];
}

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Book>) => {
      const book = action.payload;
      const index = state.items.findIndex((item) => item.id === book.id);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(book);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export const selectWishlistItems = (state: { wishlist: WishlistState }) =>
  state.wishlist.items;

export const selectIsInWishlist = (bookId: number) => (state: {
  wishlist: WishlistState;
}) => state.wishlist.items.some((item) => item.id === bookId);

export default wishlistSlice.reducer;
