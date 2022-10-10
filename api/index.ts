import axios from 'axios'

export const cosmosApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_COSMOS_API,
	timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 15000,
	headers: { 'content-type': 'application/json' }
})

// cosmosApi.interceptors.request.use(request => {
// 	console.log('Starting Request', JSON.stringify(request, null, 2))
// 	return request
// })

export const cosmosFetcher = (url: string, params: { [key: string]: string }) => {
	return cosmosApi.get(url, { params }).then(res => res.data)
}

export const evmApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_EVM_API,
	timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 15000,
	headers: {
		'content-type': 'application/json'
	}
})
// evmApi.interceptors.request.use(request => {
// 	console.log('Starting Request', JSON.stringify(request, null, 2))
// 	return request
// })

export const evmFetcher = (url: string, params: { [key: string]: string }) => {
	return evmApi.get(url, { params }).then(res => res.data)
}
