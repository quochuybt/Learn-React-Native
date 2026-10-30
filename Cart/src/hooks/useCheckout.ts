// hooks/useCheckout.ts
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createOrder, resetOrder } from "../store/slices/orderSlice";
import { clearCart } from "../store/slices/cartSlice";
import { useCart } from "./useCart";

export function useCheckout() {
  const dispatch = useAppDispatch();
  const { items, total } = useCart();
  const { status, error, lastOrderId } = useAppSelector((s) => s.order);

  const submit = async (customerName: string, address: string) => {
    const result = await dispatch(
      createOrder({ customerName, address, items, total }),
    );
    if (createOrder.fulfilled.match(result)) {
      dispatch(clearCart()); // chỉ xoá giỏ khi đặt thành công
    }
    return result;
  };

  return {
    items,
    total,
    isSubmitting: status === "loading",
    isError: status === "failed",
    isSuccess: status === "succeeded",
    error,
    lastOrderId,
    submit,
    reset: () => dispatch(resetOrder()),
  };
}
