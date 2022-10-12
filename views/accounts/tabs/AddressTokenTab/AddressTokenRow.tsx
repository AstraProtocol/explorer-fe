import clsx from 'clsx'
import Row from 'components/Grid/Row'
import { LinkText } from 'components/Typography/LinkText'
import { convertBalanceToView, ellipseBetweenText, LinkMaker } from 'utils/helper'

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
			<div style={{ width: '10%' }}>
				<LinkText href={'#'}>{data.symbol}</LinkText>
			</div>
			<div style={{ width: '10%' }}>
				<span>{data.type}</span>
			</div>
			<div style={{ width: '20%' }}>
				<span>{convertBalanceToView(data.balance)}</span>
			</div>
			<div style={{ width: '10%' }}>
				<span>{data.symbol}</span>
			</div>
			<div style={{ width: '10%' }}>
				<span></span>
			</div>
			<div style={{ width: '10%' }}>
				<span></span>
			</div>
			<div style={{ width: '20%' }}>
				<LinkText href={LinkMaker.address(data.contractAddress)}>
					{data.name} ({ellipseBetweenText(data.contractAddress)})
				</LinkText>
			</div>
		</Row>
	)
}

export default AddressTokenRow
