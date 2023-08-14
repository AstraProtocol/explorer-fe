import { combineReducers } from '@reduxjs/toolkit'

import { tokenApi } from 'store/token'
import commonReducer, { CommonState } from './commonSlice'
import themeReducer, { ThemeState } from './themeSlice'

export interface IAppState {
	theme: ThemeState
	common: CommonState
}

const rootReducers = combineReducers({
	theme: themeReducer,
	common: commonReducer,
	[tokenApi.reducerPath]: tokenApi.reducer
})

export default rootReducers
