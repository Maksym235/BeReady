export type AuthStateType = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  isLoading: boolean;
  error: string | undefined;
  token: string;
  isLoggedIn: boolean;
  isRefresing: boolean;
};
