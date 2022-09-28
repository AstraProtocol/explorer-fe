import { Typography as TypographyUI } from '@astraprotocol/astra-ui'
import API_LIST from 'api/api_list'
import Tag from 'components/Tag'
import numeral from 'numeral'
import useSWR from 'swr'
import styles from './style.module.scss'

interface Props {
	classes?: string
}

const getMarketPriceData = data => {
	return data?.ticker
}

const Price = ({ classes }: Props) => {
	const _fetchCondition = () => {
		return [API_LIST.MARKET_PRICE]
	}
	const { data: marketPriceDataRaw } = useSWR<any>(_fetchCondition(), { refreshInterval: 5000 })
	const marketPrice = getMarketPriceData(marketPriceDataRaw)

	if (!marketPrice) {
		return (
			<div className={styles.priceBlock}>
				<div className="margin-bottom-xs">
					<Tag type="warning" text="NaN" />
				</div>
				<TypographyUI.Balance value={undefined} currency="VND" />
			</div>
		)
	}

	const delta = (marketPrice.last / marketPrice.open - 1) * 100
	const deltaText = delta >= 0 ? `+${numeral(delta).format('0.00')}` : numeral(delta).format('0.00')
	const deltaStyle = delta > 0 ? 'success' : 'error'
	return (
		<div className={styles.priceBlock}>
			<div className="margin-bottom-xs">
				<Tag type={deltaStyle} text={`${deltaText}%`} />
			</div>
			<TypographyUI.Balance value={marketPrice.last} currency="VND" />
		</div>
	)
}

export default Price
