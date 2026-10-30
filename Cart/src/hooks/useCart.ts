// hooks/useCart.ts
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/slices/cartSlice";
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from "../store/selectors";
import type { Product } from "../store/slices/productsSlice";

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const count = useAppSelector(selectCartCount);

  return {
    items,
    total,
    count,
    add: (product: Product) => dispatch(addToCart(product)),
    remove: (id: string) => dispatch(removeFromCart(id)),
    updateQty: (id: string, quantity: number) =>
      dispatch(updateQuantity({ id, quantity })),
    clear: () => dispatch(clearCart()),
  };
}
