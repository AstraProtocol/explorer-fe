import clsx from 'clsx'
import Row from 'components/Grid/Row'
import styles from './style.module.scss'

const HolderHeadTitle = () => {
	return (
		<Row
			classes={clsx(
				'contrast-color-50 margin-bottom-sm margin-top-xl padding-left-lg padding-right-lg',
				styles.holderHeadTitle
			)}
		>
			<div className={clsx('hidden', styles.colIndex)}>STT</div>
			<div className={clsx('padding-left-lg col-5 ', styles.colAddress)}>Address</div>
			<div className={clsx('padding-left-lg col-5 ', styles.colBalance)}>Balance</div>
			<div className={clsx('padding-left-lg col-2 ', styles.colTxCount)}>Transaction Count</div>
		</Row>
	)
}

export default HolderHeadTitle
