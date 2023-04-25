import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import { authApi } from '../services/authAPI'
import { membersApi } from '../services/membersAPI'
import { chitsApi } from '../services/chitsAPI'
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [membersApi.reducerPath]: membersApi.reducer,
  [chitsApi.reducerPath]: chitsApi.reducer,
})

export default rootReducer
