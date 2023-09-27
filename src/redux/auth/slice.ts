import { createSlice } from "@reduxjs/toolkit";
import { AuthStateType } from "../../Types/Auth";
import {
  Register,
  Login,
  Logout,
  Current,
  UpdateLang,
  UpdateTheme,
} from "./operations";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
};
const initialState: AuthStateType = {
  user: {
    id: "",
    name: "",
    email: "",
    lang: "ua",
    theme: "light",
  },
  token: "",
  error: "",
  isLoading: false,
  isLoggedIn: false,
  isRefresing: false,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(Register.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(Register.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
        state.user = {
          name: "",
          email: "",
          id: "",
          lang: "en",
          theme: "light",
        };
      })
      .addCase(Register.fulfilled, (state, { payload: { user } }) => {
        (state.isLoading = false),
          (state.error = ""),
          (state.user = {
            name: user.name,
            email: user.email,
            id: "",
            lang: user.language,
            theme: user.theme,
          });
        state.isLoggedIn = true;
      })
      .addCase(Login.pending, (state) => {
        (state.isLoading = true), (state.error = "");
      })
      .addCase(Login.rejected, (state, { error }) => {
        (state.isLoading = false), (state.error = error.message);
      })
      .addCase(Login.fulfilled, (state, { payload: { token, id } }) => {
        (state.isLoading = false), (state.error = ""), (state.user.id = id);
        state.token = token;
        state.isLoggedIn = true;
      })
      .addCase(Logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Logout.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
        state.user = { name: "", email: "", id: "", lang: "", theme: "" };
        state.token = "";
      })
      .addCase(Current.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Current.rejected, (state, { error }) => {
        (state.isLoading = false), (state.error = error.message);
      })
      .addCase(Current.fulfilled, (state, { payload: { email } }) => {
        (state.isLoading = false),
          (state.error = ""),
          (state.user.email = email);
        state.isLoggedIn = true;
      })
      .addCase(UpdateLang.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateLang.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      })
      .addCase(UpdateLang.fulfilled, (state, { payload: { language } }) => {
        state.isLoading = false;
        state.user.lang = language;
      })
      .addCase(UpdateTheme.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateTheme.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      })
      .addCase(UpdateTheme.fulfilled, (state, { payload: { theme } }) => {
        state.isLoading = false;
        state.user.theme = theme;
      }),
});

export const authReduser = AuthSlice.reducer;

export const authPersistReduser = persistReducer(persistConfig, authReduser);
