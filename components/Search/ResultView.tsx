import clsx from 'clsx'
import dayjs from 'dayjs'
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
					<span className="money-sm">{dayjs(inserted_at).format('HH:mm:ss')}</span>
					<span className={clsx(styles.separate, 'margin-left-xs padding-left-xs margin-top-md')}></span>
					<span className="money-sm">{dayjs(inserted_at).format('DD/MM/YYYY')}</span>
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
