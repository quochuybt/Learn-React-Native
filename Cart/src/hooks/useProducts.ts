// hooks/useProducts.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/slices/productsSlice";

export function useProducts() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  return {
    products: items,
    isLoading: status === "loading",
    isError: status === "failed",
    error,
    refetch: () => dispatch(fetchProducts()),
  };
}
