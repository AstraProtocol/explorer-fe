import API_LIST from 'api/api_list'
import useSWR from 'swr'

export default function useBlock() {
	const _fetchCondition = () => {
		return [API_LIST.ALL_BLOCKS]
	}
	const { data } = useSWR<BlockResponse>(_fetchCondition(), {
		refreshInterval: parseInt(process.env.NEXT_PUBLIC_BLOCK_INTERVAL)
	})
	const blockTop10 = data?.items?.slice(0, 10)
	return {
		top10: blockTop10,
		fullPageData: data?.items
	}
}
