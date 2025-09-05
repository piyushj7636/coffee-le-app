import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi, cartApi, productApi } from "../services/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import reducer from "../features/auth";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist"

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth']
}

const rootReducer = combineReducers({
	auth: reducer,
	[productApi.reducerPath]: productApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[cartApi.reducerPath]: cartApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
		.concat(productApi.middleware)
		.concat(authApi.middleware)
		.concat(cartApi.middleware),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;