import clsx from 'clsx'
import { useState } from 'react'
import SearchModal from './SearchModal'
import styles from './style.module.scss'

export default function Search() {
	const [_openSearchModal, setOpenSearchModal] = useState(false)

	return (
		<div
			className={clsx(
				styles.search,
				'col-7 radius-base',
				'margin-auto',
				'padding-left-lg padding-right-lg',
				'padding-top-md padding-bottom-md',
				'margin-top-2xl margin-bottom-2xl'
			)}
			onClick={() => setOpenSearchModal(true)}
		>
			<span className={clsx('search-icon', styles.searchIcon)}></span>
			<input
				className={clsx('text-base ', styles.input)}
				placeholder="Search by address, token symbol name, transaction hash, or block number"
			/>
			<SearchModal
				key={`${_openSearchModal}`}
				open={_openSearchModal}
				closeModal={() => setOpenSearchModal(false)}
			/>
		</div>
	)
}
