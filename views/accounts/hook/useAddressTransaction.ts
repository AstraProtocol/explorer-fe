import { ethToAstra } from '@astradefi/address-converter'
import API_LIST from 'api/api_list'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function useAddressTransactions(address: string, page: number) {
	const [hookData, setState] = useState<UseAddressTransactionData>({
		result: [],
		pagination: { total_record: 0, total_page: 0, current_page: 0, limit: 0 }
	})

	const _fetchCondition = () => {
		return [
			`${API_LIST.ADDRESS_TRANSACTION}/${ethToAstra(address)}/transactions`,
			{
				pagination: 'offset',
				order: 'height.desc',
				page,
				limit: 20
			}
		]
	}
	const { data } = useSWR<AddressTransactionResponse>(_fetchCondition())

	const convertData = (rawData: AddressTransactionResponse): AddressTransactionData[] => {
		return rawData.result.map(d => {
			let type

			const numberOfMsgTypes = d.messageTypes.length
			const msgTypeSplit = d.messageTypes[0].split('.')
			const msgTypeShort = msgTypeSplit[msgTypeSplit.length - 1]
			if (numberOfMsgTypes >= 2) type = `${msgTypeShort} (+${numberOfMsgTypes - 1})`
			else type = msgTypeShort

			return {
				account: d.account,
				blockHash: d.blockHash,
				blockHeight: d.blockHeight,
				blockTime: d.blockTime,
				fee: d.fee.length > 0 ? d.fee[0]?.amount : '',
				hash: d.hash,
				messageTypes: d.messageTypes,
				success: d.success,
				type
			}
		})
	}

	useEffect(() => {
		if (data) {
			const newData: AddressTransactionData[] = convertData(data)
			setState({ result: newData, pagination: data.pagination })
		}
	}, [data])
	return {
		data: hookData.result,
		pagination: hookData.pagination
	}
}