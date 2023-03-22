import { astraToEth, ethToAstra } from '@astradefi/address-converter'
import API_LIST from 'api/api_list'
import { formatEther } from 'ethers/lib/utils'
import useDelayUntilDone from 'hooks/useDelayUntilDone'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getTransactionType } from 'utils/cosmos'
import { isEvmTransactionType } from 'utils/evm'
import { caculateCosmosTxAmount, caculateEthereumTxAmount, getEvmTxhash } from 'views/transactions/utils'

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
	const { data, error } = useSWR<AddressTransactionResponse>(_fetchCondition())

	const { isWaiting } = useDelayUntilDone(() => !isEmpty(data) || error)

	const getFromAndToOfEvm = (messages: TransactionMessage[]): [string, string] => {
		if (!isEmpty(messages) && messages.length > 0) {
			const message = messages[0].content as MsgEthereumTxContent
			const from = message?.params?.from
			const to = message?.params?.data?.to

			return [from, to]
		}
		return ['', '']
	}

	const getFromAndToOfCosmos = (messages: TransactionMessage[]): [string, string] => {
		if (!isEmpty(messages) && messages.length > 0) {
			let from = (messages[0].content as MsgSendContent).fromAddress
			let to = (messages[0].content as MsgSendContent).toAddress
			if (!isEmpty(from)) {
				from = astraToEth(from)
			}

			if (!isEmpty(to)) {
				to = astraToEth(to)
			}

			return [from, to]
		}
		return ['', '']
	}

	const convertData = (rawData: AddressTransactionResponse): AddressTransactionData[] => {
		return rawData.result.map(d => {
			let type

			// const numberOfMsgTypes = d.messageTypes.length
			const msgTypeSplit = d.messages[0].type.split('.')
			const msgTypeShort = msgTypeSplit[msgTypeSplit.length - 1]
			// Show in detail
			// if (numberOfMsgTypes >= 2) type = `${msgTypeShort} (+${numberOfMsgTypes - 1})`
			// else type = msgTypeShort
			type = getTransactionType(msgTypeShort)
			const evmHash = getEvmTxhash(d.messages)
			let from = ''
			let to = ''
			if (!isEmpty(evmHash)) {
				;[from, to] = getFromAndToOfEvm(d.messages)
			} else {
				;[from, to] = getFromAndToOfCosmos(d.messages)
			}

			return {
				value:
					(d.value
						? formatEther(d.value)
						: isEvmTransactionType(type)
						? caculateEthereumTxAmount(d.messages)
						: caculateCosmosTxAmount(d.messages)) || '0',
				account: d.account,
				blockHash: d.blockHash,
				blockHeight: d.blockHeight,
				blockTime: d.blockTime,
				fee: d.fee.length > 0 ? d.fee[0]?.amount : 0,
				hash: evmHash || d.hash,
				messageTypes: d.messageTypes,
				messages: d.messages as any,
				success: d.success,
				type,
				from,
				to
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
		pagination: hookData.pagination,
		loading: isWaiting
	}
}
