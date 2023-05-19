import clsx from 'clsx'
import Row from 'components/Grid/Row'
import { LinkText } from 'components/Typography/LinkText'
import { convertBalanceToView, ellipseBetweenText, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

interface Props {
	data: AddressToken
}

const AddressTokenRow = ({ data }: Props) => {
	return (
		<Row
			classes={clsx(
				'text text-base padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm border border-bottom-base'
			)}
		>
			<div className={clsx('col-2 margin-right-xs', styles.colSymbol)}>
				<LinkText href={'#'}>{data.symbol}</LinkText>
			</div>
			<div className={clsx('col-1 margin-right-xs', styles.colType)}>
				<span>{data.type}</span>
			</div>
			<div className={clsx('col-3 margin-right-xs', styles.colAmount)}>
				<span>{convertBalanceToView(data.balance)}</span>
			</div>
			<div className={clsx('col-1 margin-right-xs', styles.colSymbol)}>
				<span>{data.symbol}</span>
			</div>
			<div className={clsx('col-1', styles.colPrice)}>
				<span></span>
			</div>
			<div className={clsx('col-1', styles.colValue)}>
				<span></span>
			</div>
			<div className={clsx('col-3', styles.colAddress)}>
				<LinkText href={LinkMaker.token(data.contractAddress)}>
					{data.name} ({ellipseBetweenText(data.contractAddress)})
				</LinkText>
			</div>
		</Row>
	)
}

export default AddressTokenRow
