import { useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import { useState } from 'react'
import SearchModal from './SearchModal'
import styles from './style.module.scss'

interface Props {
	full?: boolean
}

export default function Search({ full = true }: Props) {
	const { isMobile } = useMobileLayout('small')
	const { isMobile: isResponsive } = useMobileLayout()
	const [_openSearchModal, setOpenSearchModal] = useState(false)

	return (
		<div className="search container">
			<div
				className={clsx(
					styles.search,
					'radius-base md-full',
					'padding-left-lg padding-right-lg',
					'padding-top-md padding-bottom-md',

					{
						['margin-left-md']: !full && !isResponsive,
						['col-7']: full,
						['margin-top-lg margin-bottom-lg']: isMobile && full,
						['margin-top-2xl margin-bottom-2xl margin-auto']: (!isMobile && full) || (isResponsive && full)
					}
				)}
				onClick={() => setOpenSearchModal(true)}
			>
				<span className={clsx('icon-search', styles.searchIcon)}></span>
				{full && (
					<span className={clsx(styles.input, 'text text-base ', styles.input)}>
						Search by address, token symbol name, transaction hash, or block number
					</span>
				)}
				<SearchModal
					key={`${_openSearchModal}`}
					open={_openSearchModal}
					closeModal={() => setOpenSearchModal(false)}
				/>
			</div>
		</div>
	)
}
