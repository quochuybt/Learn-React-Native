import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  membership?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: UserProfile | null;
  token: string | null;
}

const mockDefaultUser: UserProfile = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@gmail.com",
  phone: "0912 345 678",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  membership: "Thành viên Vàng (Gold VIP)",
};

const initialState: AuthState = {
  isLoggedIn: true, // Default logged in for immediate showcase, toggleable via UI
  user: mockDefaultUser,
  token: "mock-jwt-auth-token-tuan-05",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user?: UserProfile; token?: string } | undefined>
    ) => {
      state.isLoggedIn = true;
      state.user = action?.payload?.user ?? mockDefaultUser;
      state.token = action?.payload?.token ?? "mock-jwt-auth-token-tuan-05";
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },

    toggleAuth: (state) => {
      if (state.isLoggedIn) {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
      } else {
        state.isLoggedIn = true;
        state.user = mockDefaultUser;
        state.token = "mock-jwt-auth-token-tuan-05";
      }
    },
  },
});

export const { login, logout, toggleAuth } = authSlice.actions;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsLoggedIn = (state: { auth: AuthState }) =>
  state.auth.isLoggedIn;
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;

export default authSlice.reducer;
