import clsx from 'clsx'
import Image from 'next/image'
import { useMemo } from 'react'
import ResultView, { SearchResultViewItem } from './ResultView'
import { SearchStatusEnum } from './SearchModal'
import styles from './style.module.scss'

type SearchResultProps = {
	status: SearchStatusEnum
	data?: SearchItemResponse
	searchValue?: string
}

export default function SearchResult({ status, data }: SearchResultProps) {
	const _convertDataToView = useMemo((): SearchResultViewItem[] => {
		if (!data) {
			return []
		}

		const { blocks, addresses, transactions, validators, tokens, contracts } = data?.result
		const items: SearchResultViewItem[] = []
		if (blocks && blocks.length > 0) {
			for (let item of blocks) {
				if (!items.find((i: SearchResultViewItem) => item.blockNumber === i.key)) {
					items.push({
						time: item.insertedAt,
						type: 'Block',
						key: item.blockNumber,
						value: item.blockNumber,
						linkValue: `${item.blockNumber}`
					})
				}
			}
		}
		if (addresses && addresses.length > 0) {
			for (let item of addresses) {
				if (!items.find((i: SearchResultViewItem) => item.addressHash === i.key)) {
					items.push({
						time: item.insertedAt,
						type: 'Address',
						key: item.addressHash,
						value: item.name ? `${item.name} | ${item.addressHash}` : item.addressHash,
						linkValue: item.addressHash
					})
				}
			}
		}
		if (contracts && contracts.length > 0) {
			for (let item of contracts) {
				if (!items.find((i: SearchResultViewItem) => item.addressHash === i.key)) {
					items.push({
						time: item.insertedAt,
						type: 'Contract',
						key: item.addressHash,
						value: `${item.name} | ${item.addressHash}`,
						linkValue: item.addressHash
					})
				}
			}
		}
		if (transactions && transactions.length > 0) {
			for (let item of transactions) {
				if (!items.find((i: SearchResultViewItem) => (item.evmHash || item.cosmosHash) === i.key)) {
					items.push({
						time: item.insertedAt,
						key: item.evmHash || item.cosmosHash,
						type: 'Transaction',
						value: item.evmHash || item.cosmosHash,
						linkValue: item.evmHash ? `${item.evmHash}?type=evm` : item.cosmosHash
					})
				}
			}
		}

		if (validators && validators.length > 0) {
			for (let item of validators) {
				if (!items.find((i: SearchResultViewItem) => item.operatorAddress === i.key)) {
					items.push({
						status: item.status,
						type: 'Validator',
						key: item.operatorAddress,
						value: item.operatorAddress,
						linkValue: item.operatorAddress
					})
				}
			}
		}
		if (tokens && tokens.length > 0) {
			for (let item of tokens) {
				if (!items.find((i: SearchResultViewItem) => item.addressHash === i.key)) {
					items.push({
						linkValue: item.addressHash,
						type: 'Token',
						key: item.addressHash,
						value: `${item.name} (${item.symbol}) | ${item.addressHash}`,
						time: item.insertedAt
					})
				}
			}
		}

		return items
	}, [data])
	const items = _convertDataToView
	return (
		<div className={styles.searchResult}>
			{status === SearchStatusEnum.INPUTTING && (
				<div className={styles.waitResult}>
					Enter address, token symbol name, transaction hash, or block number
				</div>
			)}
			{status === SearchStatusEnum.SEARCHING && <div className={styles.waitResult}>Searching for result...</div>}
			{status === SearchStatusEnum.DONE && (!items || items.length === 0) && (
				<div className={styles.waitResult}>
					<span style={{ paddingTop: '26px' }}>
						<Image alt="Astra Blockchain" src={'/images/icons/empty_search.png'} width={164} height={97} />
					</span>
					Sorry! We could not find any results
				</div>
			)}
			{status === SearchStatusEnum.DONE && items?.length > 0 && (
				<div className={clsx(styles.searchResultList, 'padding-top-lg')}>
					<div className="text-base text-bold padding-bottom-sm margin-bottom-sm">
						{items.length} search results:
					</div>
					<div className={styles.resultScroll}>
						{items.map(item => (
							<ResultView key={item.key} item={item} />
						))}
					</div>
				</div>
			)}
		</div>
	)
}
