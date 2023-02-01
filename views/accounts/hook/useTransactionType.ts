import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { getTransactionInOrOut } from 'utils/helper'

export const useTransactionType = (from: string, to: string) => {
	const router = useRouter()
	const address = (router?.query?.address as string) || ''
	const type = useMemo(() => getTransactionInOrOut(address, from, to), [address, from, to])
	return type
}
