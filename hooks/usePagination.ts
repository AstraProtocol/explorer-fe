import { pickBy } from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { LIMIT_PER_PAGE } from 'utils/constants'
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
		total: Number(query?.total) || 0,
		limit: LIMIT_PER_PAGE,
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

		// page >= 1 will make window page re-render a time to apply query params
		if (page !== undefined && page > 1 && router.asPath !== '/') {
			router.replace(
				{
					pathname: rootPath,
					query: { ..._pagination, page }
				},
				undefined,
				{ shallow: true }
			)
		} else if (page == 1) {
			if (router.asPath !== rootPath) router.replace({ pathname: rootPath }, undefined, { shallow: true })
		}
	}

	return {
		pagination: _pagination,
		setPagination
	}
}
