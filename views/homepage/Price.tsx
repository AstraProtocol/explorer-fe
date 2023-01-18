import { Typography as TypographyUI } from '@astraprotocol/astra-ui'
import Tag from 'components/Tag'
import numeral from 'numeral'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import styles from './style.module.scss'

interface Props {
	classes?: string
}

const Price = ({ classes }: Props) => {
	const astraSummary = useAppSelector(getAstraSummary)

	if (!astraSummary) {
		return (
			<div className={styles.priceBlock}>
				<div className="margin-bottom-xs">
					<Tag type="warning" text="NaN" />
				</div>
				<TypographyUI.Balance value="NaN" currency="VND" />
			</div>
		)
	}

	const delta = (Number(astraSummary.last) / Number(astraSummary.open) - 1) * 100
	const deltaText = delta >= 0 ? `+${numeral(delta).format('0.00')}` : numeral(delta).format('0.00')
	const deltaStyle = delta == 0 ? 'warning' : delta > 0 ? 'success' : 'error'
	return (
		<div className={styles.priceBlock}>
			<div className="margin-bottom-xs">
				<Tag type={deltaStyle} text={`${deltaText}%`} />
			</div>
			<TypographyUI.Balance value={astraSummary.last} currency="VND" />
		</div>
	)
}

export default Price
