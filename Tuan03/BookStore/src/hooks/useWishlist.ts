import { useAppDispatch, useAppSelector } from "../store";
import {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
  selectWishlistItems,
} from "../store/wishlistSlice";
import { Book } from "../interface/BookInterface";

/**
 * Adapter hook for Wishlist state management (Bonus Challenge).
 */
export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectWishlistItems);

  const handleToggle = (book: Book) => {
    dispatch(toggleWishlist(book));
  };

  const handleRemove = (bookId: number) => {
    dispatch(removeFromWishlist(bookId));
  };

  const isInWishlist = (bookId: number) => {
    return wishlist.some((item) => item.id === bookId);
  };

  return {
    wishlist,
    toggleWishlist: handleToggle,
    removeFromWishlist: handleRemove,
    clearWishlist: () => dispatch(clearWishlist()),
    isInWishlist,
  };
};
