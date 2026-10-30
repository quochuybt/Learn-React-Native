import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "./cartSlice";

export interface OrderPayload {
  customerName: string;
  address: string;
  items: CartItem[];
  total: number;
}

interface OrderState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  lastOrderId: string | null;
}

const initialState: OrderState = {
  status: "idle",
  error: null,
  lastOrderId: null,
};

const BASE_URL = "https://6ac9d2683115bcc9582007ae.mockapi.io";

export const createOrder = createAsyncThunk<
  { id: string },
  OrderPayload,
  { rejectValue: string }
>("order/createOrder", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as { id: string };
  } catch (err: any) {
    return rejectWithValue(err.message ?? "Đặt hàng thất bại");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastOrderId = action.payload.id;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Đặt hàng thất bại";
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
