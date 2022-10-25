import { useRouter } from 'next/router'
import { useState } from 'react'
import { convertURLQueryToObject } from 'utils/helper'

export default function usePageQuery(rootPath: string) {
	const router = useRouter()
	const { asPath } = router
	const query = convertURLQueryToObject(asPath)
	const initPage = Number(query?.page) >= 1 ? Number(query?.page) : 1
	const [_page, _setPage] = useState<number>(initPage)
	const setPage = (page: number) => {
		_setPage(page)
		if (page !== undefined && page >= 1 && router.asPath !== '/') {
			router.push(
				{
					pathname: rootPath,
					query: { page }
				},
				undefined,
				{ shallow: true }
			)
		}
	}

	return {
		page: _page,
		setPage
	}
}
