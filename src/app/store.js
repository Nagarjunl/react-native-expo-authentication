import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../features/rootReducer'
import { authApi } from '../services/authAPI'
import { membersApi } from '../services/membersAPI'
import { chitsApi } from '../services/chitsAPI'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, membersApi.middleware, chitsApi.middleware),
})

export const persistor = persistStore(store)
