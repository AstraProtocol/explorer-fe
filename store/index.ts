import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducers from '../slices/reducers'
import { tokenApi } from './token'

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['theme']
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
					'crossChainTransfer/updateSwapConfig'
				]
			}
		}).concat(tokenApi.middleware),
	devTools: true
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducers>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
