import { useAppDispatch, useAppSelector } from "../store";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount,
  CartItem,
} from "../store/cartSlice";
import { Book } from "../interface/BookInterface";

/**
 * Adapter hook for Cart state management.
 * UI components consume this hook instead of directly importing Redux/Recoil,
 * making the UI decoupled from the specific state management library.
 */
export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalAmount = useAppSelector(selectTotalAmount);

  const addItem = (book: Book, quantity: number = 1) => {
    dispatch(addToCart({ book, quantity }));
  };

  const removeItem = (bookId: number) => {
    dispatch(removeFromCart(bookId));
  };

  const setItemQuantity = (bookId: number, quantity: number) => {
    dispatch(updateQuantity({ bookId, quantity }));
  };

  const increaseItem = (bookId: number) => {
    dispatch(increaseQuantity(bookId));
  };

  const decreaseItem = (bookId: number) => {
    dispatch(decreaseQuantity(bookId));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  return {
    items,
    totalQuantity,
    totalAmount,
    addToCart: addItem,
    removeFromCart: removeItem,
    updateQuantity: setItemQuantity,
    increaseQuantity: increaseItem,
    decreaseQuantity: decreaseItem,
    clearCart: emptyCart,
  };
};

export type { CartItem };
