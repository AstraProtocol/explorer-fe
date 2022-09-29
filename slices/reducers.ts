import { combineReducers } from '@reduxjs/toolkit'

import commonReducer, { CommonState } from './commonSlice'
import themeReducer, { ThemeState } from './themeSlice'

export interface IAppState {
	theme: ThemeState
	common: CommonState
}

const rootReducers = combineReducers({
	theme: themeReducer,
	common: commonReducer
})

export default rootReducers
