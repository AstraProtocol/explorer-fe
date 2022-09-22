import clsx from 'clsx'
import moment from 'moment'
import styles from './style.module.scss'

type ResultViewProps = {
	item: SearchItemResponse
	searchValue: string
}

export default function ResultView({ item, searchValue }: ResultViewProps) {
	const { inserted_at, type, cosmos_hash } = item
	console.log(item)
	const _getLabel = () => {
		// switch (type) {
		// 	case 'transaction_cosmos':
		// 		return cosmos_hash
		// 	default:
		// 		return cosmos_hash
		// }
		return searchValue
	}
	return (
		<div className={clsx(styles.item, 'money money-sm padding-left-xs')}>
			<div className={clsx('text-bold')}>{_getLabel()}</div>
			<div className="margin-top-xs">
				<span className="money-sm">{moment(inserted_at).utcOffset('+0700').format('HH:mm:ss (+7 UTC)')}</span>
				<span className={clsx(styles.separate, 'margin-left-xs padding-left-xs margin-top-md')}></span>
				<span className="money-sm">{moment(inserted_at).utcOffset('+0700').format('DD/MM/YYYY')}</span>
			</div>
		</div>
	)
}
