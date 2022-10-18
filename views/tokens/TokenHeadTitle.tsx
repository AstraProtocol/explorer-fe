import clsx from 'clsx'
import Row from 'components/Grid/Row'
import styles from './style.module.scss'

const TokenHeadTitle = () => {
	return (
		<Row
			classes={clsx(
				'contrast-color-50 margin-bottom-sm margin-top-xl padding-left-lg padding-right-lg',
				styles.tokenHeadTitle
			)}
		>
			<div className={clsx('hidden', styles.colIndex)}>STT</div>
			<div className={clsx('padding-left-lg col-3 ', styles.colToken)}>Token</div>
			<div className={clsx('padding-left-lg col-3 ', styles.colAddress)}>Address</div>
			<div className={clsx('padding-left-lg col-3 ', styles.colTotalSupply)}>Total Supply</div>
			<div className={clsx('padding-left-lg col-1 ', styles.colHolderCount)}>Holder Count</div>
		</Row>
	)
}

export default TokenHeadTitle
