/* eslint-disable import/no-cycle */
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const getBaseQuery = (baseUrl?: string): ReturnType<typeof fetchBaseQuery> => {
	return fetchBaseQuery({
		baseUrl: baseUrl || `${process.env.NEXT_PUBLIC_COSMOS_API}/api/v1`
	})
}
