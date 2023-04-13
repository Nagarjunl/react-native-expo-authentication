import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/rootReducer";

import { authApi } from "../services/authAPI";
import { membersApi } from "../services/membersAPI";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, membersApi.middleware),
});
