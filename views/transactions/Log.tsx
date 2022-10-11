import abiDecoder from 'abi-decoder'
import { evmApi } from 'api'
import API_LIST from 'api/api_list'
import { EventDecode } from 'components/Card/CardInfo/Components/Decode'
import RowLoader from 'components/Loader/RowLoader'
import Empty from 'components/Typography/Empty'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { evmMethodId } from 'utils/evm'
import { AbiItem } from 'web3-utils'
import LogElement, { LogElementProps } from './LogItem'

export interface AbiItemDecode extends AbiItem {
	events: EventDecode[]
}

type LogProps = {
	logs: EvmLog[]
	display: boolean
}

export default function Log({ logs, display }: LogProps) {
	const [load, setLoad] = useState(false)
	const [items, setItems] = useState<LogElementProps[]>()

	// no display and no load
	if (!display && !load) {
		return null
	}

	const getAbi = async (address: string): Promise<AbiItem[]> => {
		const res = await evmApi.get<AbiResponse>(`${API_LIST.ABI}${address}`)
		if (res.data.message === 'OK') {
			return JSON.parse(res?.data?.result)
		}
		return undefined
	}

	useEffect(() => {
		async function data() {
			if (!isEmpty(logs)) {
				const items: LogElementProps[] = []
				for (let log of logs) {
					const abi = await getAbi(log.address)
					const item: LogElementProps = {
						...log
					}
					items.push(item)
					item.methodId = evmMethodId(log?.topics[0])
					if (Array.isArray(abi)) {
						item.verified = true
						abiDecoder.addABI(abi)
						const logObj = abiDecoder.decodeLogs([log])[0] as AbiItemDecode
						const name = logObj.name
						const interfaceItem = abi.find(item => item.name === name)
						const params = interfaceItem.inputs
						const call = `${interfaceItem.name}(${interfaceItem.inputs
							.map(input => `${input.type} ${input.indexed ? 'indexed' : ''} ${input.name}`)
							.join(', ')})`
						item.call = call
						for (let para of params) {
							const input = logObj?.events.find(input => input.name === para.name)
							if (input) {
								input.indexed = para.indexed
							}
						}
						item.methodParams = logObj.events
					}
				}
				console.log(items)
				setItems(items)
			}
			setLoad(true)
		}
		data()
	}, [logs])
	return (
		<div>
			{!load ? (
				<RowLoader row={5} />
			) : isEmpty(items) ? (
				<Empty text="There are no logs for this transaction." />
			) : (
				<div>
					{items?.map((item, index) => (
						<LogElement key={item.index} {...item} borderTop={index !== 0} />
					))}
				</div>
			)}
		</div>
	)
}
