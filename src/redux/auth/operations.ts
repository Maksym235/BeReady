import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = "Bearer " + token;
};

// const unsetToken = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

export const Register = createAsyncThunk(
  "Auth/Register",
  async (data: { name: string; email: string; password: string }, ThunkAPI) => {
    try {
      const resp = await axios.post(
        "https://beready-api.onrender.com/register",
        data
      );
      console.log(resp);
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
      const resp = await axios.post("", data);
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

export const Logout = createAsyncThunk("Auth/Logout", async () => {});

export const Current = createAsyncThunk("Auth/Current", async () => {});
