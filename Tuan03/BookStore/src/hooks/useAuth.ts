import { useAppDispatch, useAppSelector } from "../store";
import {
  login,
  logout,
  toggleAuth,
  selectIsLoggedIn,
  selectCurrentUser,
  selectAuthToken,
  UserProfile,
} from "../store/authSlice";

/**
 * Adapter hook for Authentication state management.
 * Provides login, logout, and current user info without direct store coupling.
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectAuthToken);

  const handleLogin = (user?: UserProfile, token?: string) => {
    dispatch(login(user ? { user, token } : undefined));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleAuth = () => {
    dispatch(toggleAuth());
  };

  return {
    isLoggedIn,
    user,
    token,
    login: handleLogin,
    logout: handleLogout,
    toggleAuth: handleToggleAuth,
  };
};

export type { UserProfile };
