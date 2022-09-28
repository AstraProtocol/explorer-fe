import clsx from 'clsx'
import Typography from 'components/Typography'
import styles from './style.module.scss'

type ResultViewProps = {
	item: SearchItemResponse
}

export default function ResultView({ item }: ResultViewProps) {
	const { inserted_at, type, cosmos_hash, address_hash, block_hash, tx_hash } = item
	const _getLabel = () => {
		switch (type) {
			case 'transaction_cosmos':
				return cosmos_hash
			default:
				return address_hash || tx_hash || block_hash
		}
	}
	return (
		<div className={clsx(styles.item, 'money money-sm padding-left-xs')}>
			<div className={clsx('text-bold')}>{_getLabel()}</div>
			<div className={clsx(styles.viewMoreInfo, 'margin-top-xs')}>
				<div>
					<Typography.Time time={inserted_at} confirmedWithin="2ss" />
				</div>
				<div
					className={clsx(
						styles.viewTag,
						'text-xs text-bold',
						'padding-left-sm padding-right-sm',
						'border border-base',
						'block-center'
					)}
				>
					{type}
				</div>
			</div>
		</div>
	)
}
