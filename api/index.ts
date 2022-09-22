import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
	timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 15000,
	headers: { 'content-type': 'application/json' }
})

export const fetcher = (url: string, params: { [key: string]: string }) => {
	return api.get(url, { params }).then(res => res.data)
}

export default api
