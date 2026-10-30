import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

const BASE_URL = "https://6ac9d2683115bcc9582007ae.mockapi.io";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as Product[];
  } catch (err: any) {
    return rejectWithValue(err.message ?? "Lỗi không xác định");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Đã có lỗi";
      });
  },
});

export default productsSlice.reducer;
