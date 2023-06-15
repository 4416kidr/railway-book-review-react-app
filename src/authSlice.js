import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignIn: cookie.get("token") !== undefined,
  },
  reducers: {
    singIn: (state) => {
      state.isSignIn = true;
    },
    singOut: (state) => {
      state.isSingIn = false;
    },
  },
});

export const {singIn, singOut} = authSlice.actions;
