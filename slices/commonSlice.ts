import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'

// Define a type for the slice state
export interface CommonState {
	astraSummary: AstraSummary | undefined
	validatorSummary: ValidatorData[] | []
}
// Define the initial state using that type
const initialState: CommonState = {
	astraSummary: undefined,
	validatorSummary: []
}

export const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setAstraSummary: (state, action: PayloadAction<AstraSummary>) => {
			state.astraSummary = action.payload
		},
		setValidatorSummary: (state, action: PayloadAction<ValidatorData[]>) => {
			state.validatorSummary = action.payload
		}
	}
})

export const getAstraSummary = (state: RootState): any => state['common'].astraSummary
export const getValidatorSummary = (state: RootState): any => state['common'].validatorSummary

// Action creators are generated for each case reducer function
export const { setAstraSummary, setValidatorSummary } = commonSlice.actions

export default commonSlice.reducer
