import { pickBy } from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { convertURLQueryToObject } from 'utils/helper'

type CustomRouter = {
	page?: number
	total?: number
	limit?: number
	pagination?: 'offset'
	order?: 'height.desc'
}

export default function usePagination(rootPath: string) {
	const router = useRouter()
	const { asPath } = router
	const query = convertURLQueryToObject(asPath)
	const [_pagination, _setPagination] = useState<CustomRouter>({
		page: Number(query?.page) || 1,
		total: Number(query?.total) | 0,
		limit: 20,
		pagination: 'offset',
		order: 'height.desc'
	})
	const setPagination = ({ page, total }: CustomRouter) => {
		let data: CustomRouter = { page, total }
		data = pickBy<CustomRouter>(data, item => item !== undefined)

		_setPagination({
			..._pagination,
			...data
		})
		if (page !== undefined && page > 1) {
			router.push(
				{
					pathname: rootPath,
					query: { ..._pagination, page }
				},
				undefined,
				{ shallow: true }
			)
		}
	}

	return {
		pagination: _pagination,
		setPagination
	}
}
