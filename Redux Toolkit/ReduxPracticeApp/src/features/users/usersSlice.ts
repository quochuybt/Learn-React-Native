import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase?: string;
  };
}

interface UsersState {
  list: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  status: 'idle',
  error: null,
};

// 1. Khai báo async thunk lấy danh sách người dùng từ API
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        return rejectWithValue(`Lỗi HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data as User[];
    } catch (err: any) {
      return rejectWithValue(err.message || 'Không thể kết nối đến máy chủ');
    }
  }
);

// 2. Slice quản lý state
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsersStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Trạng thái Pending: đang gọi API
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Trạng thái Fulfilled: gọi API thành công
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      // Trạng thái Rejected: gọi API thất bại
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Lỗi không xác định';
      });
  },
});

export const { resetUsersStatus } = usersSlice.actions;

// Selectors
export const selectUsers = (state: { users: UsersState }) => state.users.list;
export const selectUsersStatus = (state: { users: UsersState }) => state.users.status;
export const selectUsersError = (state: { users: UsersState }) => state.users.error;

export default usersSlice.reducer;

