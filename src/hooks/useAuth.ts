import { useAppSelector } from "../redux/store";

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isRefresing = useAppSelector((state) => state.auth.isRefresing);
  return {
    user,
    isLoggedIn,
    isRefresing,
  };
};
