import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUser, LoginUserResponse, User } from "@/types/user";
import jwt_decode from "jwt-decode";
import { AuthStateValue, TokenPayload } from "@/types/auth";
import { getToken, saveToken, wipeToken } from "@/utils/tokenStorage";

interface AuthState {
  value: AuthStateValue | null;
}

const initialState: AuthState = {
  value: (() => {
    const token = getToken();
    if (token) {
      const decoded: TokenPayload = jwt_decode(token);
      return {
        user: decoded.user,
        permissions: decoded.permissions,
        token,
        timestamp: decoded.timestamp,
      };
    }
    return {
      user: null,
      permissions: [],
      token: null,
      timestamp: 0,
    };
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginUserResponse>) => {
      const decoded: TokenPayload = jwt_decode(action.payload.token);
      const authState: AuthStateValue = {
        user: action.payload.user,
        permissions: decoded.permissions,
        token: action.payload.token,
        timestamp: decoded.timestamp,
      };
      saveToken(action.payload.token);
      state.value = { ...authState };
    },
    logout: (state) => {
      wipeToken();
      state.value = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
