import abiDecoder from 'abi-decoder'
import { evmApi } from 'api'
import API_LIST from 'api/api_list'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import { EventDecode } from 'components/Card/CardInfo/Components/Decode'
import { isArray, isEmpty, isUndefined } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { evmMethodId } from 'utils/evm'
import { AbiItem } from 'web3-utils'
import Spinner from '../../components/Spinner'
import ModalContractVerify from '../../components/VerifyContract'
import LogElement, { LogElementProps } from './LogItem'
import styles from './style.module.scss'

export interface AbiItemDecode extends AbiItem {
	params: EventDecode[]
}

type DecodeInputProps = {
	dataInput: string
	address: string
	evmHash?: string
}

export default function DecodeInput({ dataInput, address, evmHash }: DecodeInputProps) {
	const router = useRouter()
	const [verifyVisible, setVerifiVisible] = useState(false)

	const [load, setLoad] = useState(false)
	const [items, setItems] = useState<LogElementProps[]>(undefined)

	const onShowVerify = () => {
		setVerifiVisible(true)
	}
	const onVerifyCancel = () => {
		setVerifiVisible(false)
	}

	const onVerifyDone = () => {
		router.reload()
	}

	const getAbi = async (address: string): Promise<{ abi: AbiItem[]; hasVerified: boolean }> => {
		// datainput from hash
		if (evmHash) {
			const hashAbiRes = await evmApi.get<HashAbiResponse>(`${API_LIST.HASH_ABI}${evmHash}`)

			if (hashAbiRes.data.message === 'OK') {
				return { abi: [hashAbiRes?.data?.result?.abi], hasVerified: hashAbiRes?.data?.result?.verified }
			}
		}

		return { abi: undefined, hasVerified: false }
	}

	useEffect(() => {
		async function data() {
			if (!isEmpty(dataInput)) {
				let items: LogElementProps[] = []
				const { abi, hasVerified } = await getAbi(address)
				const item: LogElementProps = {
					address: address,
					data: '',
					index: '',
					showAddress: false,
					topics: []
				}
				items.push(item)
				item.methodId = evmMethodId(dataInput)

				item.verified = hasVerified
				item.useDraftAbiToDecode = !hasVerified && !!abi

				if (Array.isArray(abi)) {
					abiDecoder.addABI(abi)
					const inputObj = abiDecoder.decodeMethod(dataInput) as AbiItemDecode
					if (!isUndefined(inputObj)) {
						const name = inputObj?.name
						const interfaceItem = abi.find(item => item.name === name)
						if (interfaceItem) {
							const params = interfaceItem.inputs
							const call = `${interfaceItem.name}(${interfaceItem.inputs
								.map(input => `${input.type} ${input.indexed ? 'indexed' : ''} ${input.name}`)
								.join(', ')})`
							item.call = call
							item.callRow = call
							for (let para of params) {
								const input = inputObj?.params.find(input => input.name === para.name)
								// tuple
								if (!isEmpty(para?.components)) {
									input.type = `(${para.components.map(item => item.type).join(',')})`
									input.value = `(${(input.value as string[]).join(',')})`
								} else if (isArray(input.value)) {
									// array
									input.value = JSON.stringify(input.value)
								}
								if (input) {
									input.indexed = para.indexed
								}
							}
						}
						item.methodParams = inputObj?.params
					} else {
						items = []
					}
				}
				setItems(items)
			} else {
				setItems([])
			}
			setLoad(true)
		}
		data()
	}, [address, dataInput])

	let content
	if (dataInput) {
		content = !isEmpty(items) ? (
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
							<LogElement
								onOpenVerify={onShowVerify}
								key={item.index}
								{...item}
								borderTop={index !== 0}
								showLeftBorder={false}
							/>
						))}
					</BackgroundCard>
				)}
			</div>
		) : isEmpty(items) && isArray(items) ? (
			<BackgroundCard classes="padding-top-xl padding-bottom-xl margin-bottom-md">
				<div className="padding-left-2xl padding-right-2xl sm-padding-left-md sm-padding-right-md">
					<div
						className={clsx(
							styles.verifyContract,
							'contrast-color-100',
							'padding-top-sm padding-bottom-sm padding-left-xs padding-right-xs'
						)}
					>
						To see accurate decoded input data, the contract must be verified. Verify the contract{' '}
						{/* <Link href={LinkMaker.address(address, '/verify')}> */}
						<a className="link" onClick={() => onShowVerify()}>
							here
						</a>
						{/* </Link> */}.
					</div>
				</div>
			</BackgroundCard>
		) : null
	}

	return (
		<div>
			{content}
			<ModalContractVerify
				onClose={onVerifyCancel}
				onSuccess={onVerifyDone}
				address={address}
				open={verifyVisible}
			/>
		</div>
	)
}
