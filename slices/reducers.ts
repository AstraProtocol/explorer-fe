import { combineReducers } from '@reduxjs/toolkit'

import themeReducer, { ThemeState } from './themeSlice'

export interface IAppState {
	theme: ThemeState
}

const rootReducers = combineReducers({
	theme: themeReducer
})

export default rootReducers
