import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { authApi } from "../services/authAPI";
import { membersApi } from "../services/membersAPI";
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [membersApi.reducerPath]: membersApi.reducer,
});

export default rootReducer;
