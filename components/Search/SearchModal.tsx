import { ModalWrapper } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { LinkMaker } from 'utils/helper'
import API_LIST from '../../api/api_list'
import useOutsideElement from '../../hooks/useOutsideElement'

import Spinner from '../Spinner'
import SearchResult from './SearchResult'
import styles from './style.module.scss'

export enum SearchStatusEnum {
	INPUTTING,
	DONE,
	SEARCHING
}

export type SearchItem = {
	label: string
	time: string
}

type SearchModalProps = {
	open: boolean
	closeModal: Function
}
const INPUT_TIMEOUT = 500 //0.3s

export default function SearchModal({ open, closeModal }: SearchModalProps) {
	const router = useRouter()
	const _searchWrapperRef = useRef<HTMLDivElement>(null)
	const _inputRef = useRef<HTMLInputElement>(null)
	const [_search, _setSearch] = useState<boolean>(false)
	const [_timeout, _setTimeout] = useState<NodeJS.Timeout>(undefined)
	const [_searchStatus, _setSearchStatus] = useState<SearchStatusEnum>(SearchStatusEnum.INPUTTING)

	useOutsideElement(_searchWrapperRef, closeModal)
	// const _standardQueryInput = (value: string): string => {
	// 	if (!value) {
	// 		return value
	// 	}
	// 	if (value.toLowerCase().startsWith('astra')) {
	// 		value = astraToEth(value)
	// 	}
	// 	return xss(value)
	// }
	const _fetch = () => {
		const value = _inputRef?.current?.value
		if (_search && value) {
			return [`${API_LIST.SEARCH}${value}`]
		}
		return null
	}
	const response = useSWR(_fetch())
	const data: SearchItemResponse = response.data
	useEffect(() => {
		_setSearchStatus(SearchStatusEnum.DONE)
	}, [router.asPath])
	useEffect(() => {
		if (_search && data !== undefined) {
			_setSearchStatus(SearchStatusEnum.DONE)
		}
	}, [data, _search])
	useEffect(() => {
		if (open) {
			setTimeout(() => {
				_inputRef.current.focus()
			}, 100)
		}
	}, [open])

	const _keyPress = event => {
		event.stopPropagation()
		if (event.key === 'Enter') {
			if (data && data.result) {
				const { blocks, addresses, transactions, validators, tokens } = data?.result
				const tx = transactions?.[0]
					? transactions[0].evmHash
						? `${transactions[0].evmHash}?type=evm`
						: transactions[0].cosmosHash
					: undefined
				const block = blocks?.[0] ? blocks[0].blockHash : undefined
				const address = addresses?.[0] ? addresses[0].addressHash : undefined
				const validator = validators?.[0] ? validators[0].operatorAddress : undefined
				const token = tokens?.[0] ? tokens[0].addressHash : undefined

				let key
				if (tx) {
					key = LinkMaker.transaction(tx)
				} else if (block) {
					key = LinkMaker.block(block)
				} else if (address) {
					key = LinkMaker.address(address)
				} else if (token) {
					key = LinkMaker.token(token)
				} else {
					key = LinkMaker.address(validator)
				}
				if (key) router.push(key)
			}
		}
	}

	const _inputChange = (event: React.FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value
		clearTimeout(_timeout)
		if (_search) {
			_setSearch(false)
			_setSearchStatus(SearchStatusEnum.INPUTTING)
		}
		const timeout = setTimeout(() => {
			if (value) {
				_setSearch(true)
				_setSearchStatus(SearchStatusEnum.SEARCHING)
			}
		}, INPUT_TIMEOUT)
		_setTimeout(timeout)
	}
	const _clearSearch = () => {
		_setSearch(false)
		_setSearchStatus(SearchStatusEnum.INPUTTING)
		_inputRef.current.value = ''
	}
	return (
		<ModalWrapper open={open} classes={{ wrapperContent: 'same-bg-color-50' }}>
			<div className={clsx(styles.searchModal, 'col-7 md-full radius-2xl padding-lg')} ref={_searchWrapperRef}>
				<div
					className={clsx(
						styles.inputWrapper,
						_searchStatus === SearchStatusEnum.INPUTTING && styles.inputActive,
						'radius-base',
						'padding-sm',
						'border border-lg'
					)}
				>
					<input
						autoFocus
						className={clsx('text-base padding-right-lg', styles.input)}
						ref={_inputRef}
						onChange={_inputChange}
						onSubmit={_inputChange}
						onKeyDown={_keyPress}
					/>
					<div className={clsx(styles.inputPrefix)}>
						{_searchStatus !== SearchStatusEnum.DONE && _search ? (
							<Spinner />
						) : _searchStatus === SearchStatusEnum.DONE ? (
							<span className={styles.clearInput} onClick={_clearSearch}></span>
						) : (
							<span className={clsx('icon-search', styles.searchIcon)}></span>
						)}
					</div>
				</div>
				<SearchResult status={_searchStatus} data={data as SearchItemResponse} />
			</div>
		</ModalWrapper>
	)
}
