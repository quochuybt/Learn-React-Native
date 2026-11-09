import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// Selectors cơ bản
export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectDiscountCode = (state: RootState) => state.cart.discountCode;
export const selectShippingCost = (state: RootState) => state.cart.shippingCost;
export const selectTaxRate = (state: RootState) => state.cart.taxRate;

// Memoized Subtotal (Tổng trước thuế)
export const selectSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

// Memoized Discount (Tính số tiền giảm)
export const selectDiscount = createSelector(
  [selectSubtotal, selectDiscountCode],
  (subtotal, discountCode) => {
    const discountRates: Record<string, number> = {
      SUMMER10: 0.1, // 10%
      SPECIAL20: 0.2, // 20%
    };
    const rate = discountCode ? discountRates[discountCode] || 0 : 0;
    return subtotal * rate;
  }
);

// Memoized Tax (Thuế 10%)
export const selectTax = createSelector(
  [selectSubtotal, selectTaxRate],
  (subtotal, taxRate) => subtotal * taxRate
);

// Memoized Total (Tổng thanh toán)
export const selectCartTotal = createSelector(
  [selectSubtotal, selectDiscount, selectTax, selectShippingCost, selectCartItems],
  (subtotal, discount, tax, shippingCost, items) => {
    if (items.length === 0) return 0;
    return Math.max(0, subtotal - discount + tax + shippingCost);
  }
);

// Memoized ItemCount (Số lượng sản phẩm)
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

// Memoized Summary (Chi tiết toàn bộ hóa đơn - áp dụng createSelector để tránh re-render thừa)
export const selectCartSummary = createSelector(
  [selectSubtotal, selectDiscount, selectTax, selectShippingCost, selectCartTotal, selectCartItemCount, selectCartItems],
  (subtotal, discount, tax, shipping, total, itemCount, items) => ({
    subtotal,
    discount,
    tax,
    shipping: items.length > 0 ? shipping : 0,
    total,
    itemCount,
  })
);
