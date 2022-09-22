import clsx from 'clsx'
import { ChangeEventHandler, useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import useOutsideElement from '../../hooks/useOutsideElement'
import ModalWrapper from '../Modal/ModalWrapper'
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
	const _searchWrapperRef = useRef<HTMLDivElement>(null)
	const _inputRef = useRef<HTMLInputElement>(null)
	const [_search, _setSearch] = useState<boolean>(false)
	const [_timeout, _setTimeout] = useState<NodeJS.Timeout>(undefined)
	const [_searchStatus, _setSearchStatus] = useState<SearchStatusEnum>(SearchStatusEnum.INPUTTING)
	const [_results, _setResults] = useState<SearchItem[]>()

	useOutsideElement(_searchWrapperRef, closeModal)
	useEffect(() => {
		if (open) {
			setTimeout(() => {
				_inputRef.current.focus()
			}, 100)
		}
	}, [open])

	useEffect(() => {
		const value = _inputRef?.current?.value
        console.log(value)
		if (_search && value) {
			if (value === 'fail') {
				_setSearchStatus(SearchStatusEnum.DONE)
                _setResults(undefined)
			} else {
				setTimeout(() => {
					_setSearchStatus(SearchStatusEnum.DONE)
					_setResults([
						{
							label: '0x913d6f1177d5accc60619485466298184d8777840cfb2d862e3d5e37090e2a8d',
							time: 'hh:mm:ssss (+7 UTC)'
						}
					])
				}, 2000)
			}
		}
	}, [_search, _inputRef])

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
		_setResults(undefined)
		_setSearchStatus(SearchStatusEnum.INPUTTING)
        _inputRef.current.value = "";
	}
	return (
		<ModalWrapper open={open}>
			<div className={clsx(styles.searchModal, 'col-7 radius-2xl padding-lg')} ref={_searchWrapperRef}>
				<div className={clsx(styles.inputWrapper, 'radius-base', 'padding-sm', 'border border-lg')}>
					<input className={clsx('text-base ', styles.input)} ref={_inputRef} onChange={_inputChange} />
					<div className={clsx(styles.inputPrefix)}>
						{_searchStatus !== SearchStatusEnum.DONE && _search ? (
							<Spinner />
						) : _searchStatus === SearchStatusEnum.DONE ? (
							<span className={styles.clearInput} onClick={_clearSearch}></span>
						) : (
							<span className={clsx('search-icon', styles.searchIcon)}></span>
						)}
					</div>
				</div>
				<SearchResult status={_searchStatus} items={_results} />
			</div>
		</ModalWrapper>
	)
}
