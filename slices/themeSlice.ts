import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum ThemeEnum {
	DARK = 'dark--mode',
	LIGHT = 'light--mode'
}

// Define a type for the slice state
export interface ThemeState {
	value: ThemeEnum
}
// Define the initial state using that type
const initialState: ThemeState = {
	value: ThemeEnum.DARK
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		switchTheme: state => {
			let value = ThemeEnum.LIGHT
			if (state.value === ThemeEnum.LIGHT) {
				value = ThemeEnum.DARK
			}
			state.value = value
		},
		setTheme: (state, action: PayloadAction<ThemeEnum>) => {
			state.value = action.payload
		}
	}
})

export const selectTheme = (state: RootState): ThemeEnum => state['theme'].value

// Action creators are generated for each case reducer function
export const { switchTheme, setTheme } = themeSlice.actions

export default themeSlice.reducer
