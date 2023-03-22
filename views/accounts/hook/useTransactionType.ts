import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { getTransactionInOrOut } from 'utils/helper'

export const useTransactionType = (from: string, to: string, createdContractAddressHash?: string) => {
	const router = useRouter()
	if (!isEmpty(createdContractAddressHash)) return 'Contract Creation'

	const address = (router?.query?.address as string) || ''
	if (isEmpty(address)) return ''

	const type = getTransactionInOrOut(address, from, to)
	return type
}
