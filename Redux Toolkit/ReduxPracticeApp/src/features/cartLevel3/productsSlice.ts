import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Dữ liệu dự phòng nếu mạng chập chờn
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro M3 14"',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300',
  },
  {
    id: 2,
    name: 'iPhone 16 Pro Max',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
  },
  {
    id: 4,
    name: 'Bàn phím cơ Keychron Q1',
    price: 180,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300',
  },
  {
    id: 5,
    name: 'Chuột Logitech MX Master 3S',
    price: 99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300',
  },
];

// Async Thunk: Lấy sản phẩm từ API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=6');
      if (!response.ok) throw new Error('Không thể tải sản phẩm từ API');
      const data = await response.json();
      return data.map((item: any) => ({
        id: item.id,
        name: item.title,
        price: Math.round(item.price),
        image: item.image,
        category: item.category,
      })) as Product[];
    } catch (err: any) {
      // Sử dụng fallback nếu API ngoài bị chậm hoặc giới hạn
      return FALLBACK_PRODUCTS;
    }
  }
);

const initialState: ProductsState = {
  items: FALLBACK_PRODUCTS,
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Lỗi tải sản phẩm';
      });
  },
});

export const selectProducts = (state: { products: ProductsState }) => state.products.items;
export const selectProductsStatus = (state: { products: ProductsState }) => state.products.status;
export const selectProductsError = (state: { products: ProductsState }) => state.products.error;

export default productsSlice.reducer;

