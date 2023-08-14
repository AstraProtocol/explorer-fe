import { createApi } from '@reduxjs/toolkit/query/react'
import { getBaseQuery } from 'utils/basequery'

export interface TokenPriceResponse {
	result: {
		price: string
		blockTimestampLast: string
	}
}

export const tokenApi = createApi({
	reducerPath: 'token',
	baseQuery: getBaseQuery(),
	endpoints: builder => ({
		// update
		getTokenPrice: builder.query<TokenPriceResponse, { pair: string }>({
			query: ({ pair }) => ({
				url: `/token-price/${pair}`,
				method: 'GET'
			})
		})
	})
})

export const { useGetTokenPriceQuery } = tokenApi
