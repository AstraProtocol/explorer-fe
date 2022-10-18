import abiDecoder from 'abi-decoder'
import { evmApi } from 'api'
import API_LIST from 'api/api_list'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import { EventDecode } from 'components/Card/CardInfo/Components/Decode'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { evmMethodId } from 'utils/evm'
import { AbiItem } from 'web3-utils'
import Spinner from '../../components/Spinner'
import LogElement, { LogElementProps } from './LogItem'

export interface AbiItemDecode extends AbiItem {
	params: EventDecode[]
}

type DecodeInputProps = {
	dataInput: string
	address: string
	evmHash?: string
}

export default function DecodeInput({ dataInput, address, evmHash }: DecodeInputProps) {
	if (!dataInput || !address) {
		return null
	}
	const [load, setLoad] = useState(false)
	const [items, setItems] = useState<LogElementProps[]>()

	const getAbi = async (address: string): Promise<{ abi: AbiItem[]; hasAbi: boolean }> => {
		const addressAbiRes = await evmApi.get<AbiResponse>(`${API_LIST.ABI}${address}`)
		if (addressAbiRes.data.message === 'OK') {
			return { abi: JSON.parse(addressAbiRes?.data?.result), hasAbi: true }
		}
		// datainput from hash
		if (evmHash) {
			const hashAbiRes = await evmApi.get<HashAbiResponse>(`${API_LIST.HASH_ABI}${evmHash}`)
			if (hashAbiRes.data.message === 'OK') {
				return { abi: [hashAbiRes?.data?.result?.abi], hasAbi: false }
			}
		}

		return { abi: undefined, hasAbi: false }
	}

	useEffect(() => {
		async function data() {
			if (!isEmpty(dataInput)) {
				const items: LogElementProps[] = []
				const { abi, hasAbi } = await getAbi(address)
				const item: LogElementProps = {
					address: address,
					data: '',
					index: '',
					showAddress: false,
					topics: []
				}
				items.push(item)
				item.methodId = evmMethodId(dataInput)

				item.verified = hasAbi
				item.useDraftAbiToDecode = !hasAbi && !!abi

				if (Array.isArray(abi)) {
					abiDecoder.addABI(abi)
					const inputObj = abiDecoder.decodeMethod(dataInput) as AbiItemDecode
					const name = inputObj.name
					const interfaceItem = abi.find(item => item.name === name)
					const params = interfaceItem.inputs
					const call = `${interfaceItem.name}(${interfaceItem.inputs
						.map(input => `${input.type} ${input.indexed ? 'indexed' : ''} ${input.name}`)
						.join(', ')})`
					item.call = call
					item.callRow = call
					for (let para of params) {
						const input = inputObj?.params.find(input => input.name === para.name)
						if (input) {
							input.indexed = para.indexed
						}
					}
					item.methodParams = inputObj.params
				}
				setItems(items)
			}
			setLoad(true)
		}
		data()
	}, [dataInput])

	return (
		<div>
			{!load ? (
				<div className="padding-xl" style={{ display: 'flex', justifyContent: 'center' }}>
					<Spinner />
				</div>
			) : (
				<BackgroundCard classes={`margin-bottom-md`}>
					<div
						className="text text-xl text-bold padding-left-2xl"
						style={{ marginTop: '30px', marginBottom: '22px' }}
					>
						INPUT
					</div>
					{items?.map((item, index) => (
						<LogElement key={item.index} {...item} borderTop={index !== 0} showLeftBorder={false} />
					))}
				</BackgroundCard>
			)}
		</div>
	)
}
