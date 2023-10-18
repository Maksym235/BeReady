import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { AuthStateType } from "../../Types/Auth";
axios.defaults.baseURL = "https://beready-api-maksym235.vercel.app/auth/";
const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = "Bearer " + token;
};

const unsetToken = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const Register = createAsyncThunk(
  "Auth/Register",
  async (data: { name: string; email: string; password: string }, ThunkAPI) => {
    try {
      const resp = await axios.post("register", data);
      console.log(resp);
      if (resp.data.message === "registered successfully") {
        const loginResp = await axios.post("login", {
          email: data.email,
          password: data.password,
        });
        if (resp.status === 200) {
          setToken(resp.data.token);
        }
        return loginResp.data;
      }
      return resp.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const Login = createAsyncThunk(
  "Auth/Login",
  async (data: { email: string; password: string }, ThunkAPI) => {
    try {
      const resp = await axios.post("login", data, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });
      if (resp.status === 200) {
        setToken(resp.data.token);
      }
      console.log(resp);
      return resp.data;
    } catch (error) {
      ThunkAPI.rejectWithValue("Login failed");
    }
  }
);

export const Logout = createAsyncThunk("Auth/Logout", async (_, ThunkAPI) => {
  try {
    const resp = await axios.post("logout");
    return resp;
    unsetToken();
  } catch (error) {
    ThunkAPI.rejectWithValue("failed");
  }
});

export const Current: any = createAsyncThunk<
  AuthStateType,
  string,
  { state: RootState }
>("Auth/Current", async (_, ThunkAPI: any) => {
  const state = ThunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return ThunkAPI.rejectWithValue("Unable to fetch user");
  }
  try {
    setToken(persistedToken);
    const resp = await axios.get("current");
    return resp.data;
  } catch (error) {
    ThunkAPI.rejectWithValue("failed");
  }
});

export const UpdateLang = createAsyncThunk(
  "Auth/UpdateLang",
  async (data: { email: string; lang: string }, ThunkAPI) => {
    try {
      const resp = await axios.patch("updateLang", data);
      return resp.data;
    } catch (error) {
      ThunkAPI.rejectWithValue("failed");
    }
  }
);

export const UpdateTheme = createAsyncThunk(
  "Auth/UpdateTheme",
  async (data: { email: string; theme: string }, ThunkAPI) => {
    try {
      const resp = await axios.patch("updateTheme", data);
      return resp.data;
    } catch (error) {
      ThunkAPI.rejectWithValue("failed");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "Auth/resetPassword",
  async (data: { email: string }, ThunkAPI) => {
    try {
      const resp = await axios.post("resetPassword", data);
      return resp.data;
    } catch (error) {
      ThunkAPI.rejectWithValue("failed");
    }
  }
);

export const setNewPassword = createAsyncThunk(
  "Auth/setNewPassword",
  async (data: { email: string; password: string }, ThunkAPI) => {
    try {
      const resp = await axios.post("newpass", data);
      return resp.data;
    } catch (error) {
      throw ThunkAPI.rejectWithValue("failed");
    }
  }
);
