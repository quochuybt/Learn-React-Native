import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import productsReducer from '../features/cartLevel3/productsSlice';
import cartReducer from '../features/cartLevel3/cartSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

