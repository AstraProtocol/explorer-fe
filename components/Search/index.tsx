import { useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Container from 'components/Container'
import { useState } from 'react'
import SearchModal from './SearchModal'
import styles from './style.module.scss'

export default function Search() {
	const { isMobile } = useMobileLayout('small')
	const [_openSearchModal, setOpenSearchModal] = useState(false)

	return (
		<Container>
			<div
				className={clsx(
					styles.search,
					'col-7 radius-base md-full',
					'margin-auto',
					'padding-left-lg padding-right-lg',
					'padding-top-md padding-bottom-md',
					isMobile ? 'margin-top-lg margin-bottom-lg' : 'margin-top-2xl margin-bottom-2xl'
				)}
				onClick={() => setOpenSearchModal(true)}
			>
				<span className={clsx('icon-search', styles.searchIcon)}></span>
				<span className={clsx(styles.input, 'text text-base ', styles.input)}>
					Search by address, token symbol name, transaction hash, or block number
				</span>
				<SearchModal
					key={`${_openSearchModal}`}
					open={_openSearchModal}
					closeModal={() => setOpenSearchModal(false)}
				/>
			</div>
		</Container>
	)
}
