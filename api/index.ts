import axios from 'axios'

const cosmosApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_COSMOS_API,
	timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 15000,
	headers: { 'content-type': 'application/json' }
})
export const cosmosFetcher = (url: string, params: { [key: string]: string }) => {
	return cosmosApi.get(url, { params }).then(res => res.data)
}

const evmApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_EVM_API,
	timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 15000,
	headers: { 'content-type': 'application/json' }
})

export const evmFetcher = (url: string, params: { [key: string]: string }) => {
	return evmApi.get(url, { params }).then(res => res.data)
}
