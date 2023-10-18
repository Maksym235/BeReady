export type AuthStateType = {
  user: {
    id: string;
    name: string;
    email: string;
    theme: string;
    lang: string;
  };
  isLoading: boolean;
  error: string | undefined;
  token: string;
  isLoggedIn: boolean;
  isRefresing: boolean;
  resetPasswordEmail: string;
};
