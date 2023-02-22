import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'

// Define a type for the slice state
export interface CommonState {
	latestBlock: number
	astraSummary: AstraSummary | undefined
	validatorSummary: ValidatorData[] | []
}
// Define the initial state using that type
const initialState: CommonState = {
	latestBlock: 0,
	astraSummary: undefined,
	validatorSummary: []
}

export const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setLatestBlock: (state, action: PayloadAction<number>) => {
			state.latestBlock = action.payload
		},
		setAstraSummary: (state, action: PayloadAction<AstraSummary>) => {
			state.astraSummary = action.payload
		},
		setValidatorSummary: (state, action: PayloadAction<ValidatorData[]>) => {
			state.validatorSummary = action.payload
			localStorage.setItem('validators', JSON.stringify(action.payload))
		}
	}
})

export const getLatestBlock = (state: RootState): number => state['common'].latestBlock
export const getAstraSummary = (state: RootState): AstraSummary => state['common'].astraSummary
export const getValidatorSummary = (state: RootState): ValidatorData[] => state['common'].validatorSummary

// Action creators are generated for each case reducer function
export const { setLatestBlock, setAstraSummary, setValidatorSummary } = commonSlice.actions

export default commonSlice.reducer
