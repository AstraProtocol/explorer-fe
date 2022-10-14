import { CryptoIcon, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import BigNumber from 'bignumber.js'
import clsx from 'clsx'
import Row from 'components/Grid/Row'
import Tag from 'components/Tag'
import Timer from 'components/Timer'
import { LinkText } from 'components/Typography/LinkText'
import numeral from 'numeral'
import { convertBalanceToView, ellipseBetweenText, LinkMaker } from 'utils/helper'

interface Props {
	data: AddressCoinBalanceHistory
	astraSummary: any
	addressBalance: any
}

const AddressBalanceHistory = ({ data, addressBalance, astraSummary }: Props) => {
	const deltaNumber = BigNumber(data.delta).div(BigNumber(data.value)).toNumber()
	const deltaNumberHandled = Math.abs(deltaNumber * 100) < 10 ** -3 ? 0 : deltaNumber * 100

	const deltaNumberFormat = deltaNumberHandled ? numeral(deltaNumberHandled).format('0,0.00') : '0.00'
	const deltaText = deltaNumberHandled >= 0 ? `+${deltaNumberFormat}` : deltaNumberFormat

	const deltaStyle = deltaNumberHandled == 0 ? 'warning' : deltaNumberHandled > 0 ? 'success' : 'error'

	return (
		<Row
			classes={clsx(
				'text text-base padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm border border-bottom-base'
			)}
		>
			<div className="col-2">
				<LinkText href={LinkMaker.block(data.blockNumber)}>#{data.blockNumber}</LinkText>
			</div>
			<div className="col-3">
				<LinkText href={LinkMaker.address(data.transactionHash)}>
					{ellipseBetweenText(data.transactionHash)}
				</LinkText>
			</div>
			<div className="col-5" style={{ display: 'flex', alignItems: 'center' }}>
				<TypographyUI.Balance
					size="sm"
					currency=""
					icon={<CryptoIcon name="asa" size="sm" />}
					value={
						addressBalance.balance ? convertBalanceToView(addressBalance.balance) : addressBalance.balance
					}
					fixNumber={15}
				/>
				<span className="padding-left-xs money money-sm contrast-color-70">ASA</span>
				<Tag classes="margin-left-xs" type={deltaStyle} text={`${deltaText}%`} />
			</div>
			<div className="col-2">
				{/* <span className="padding-right-xs money money-sm contrast-color-70">
					{dayjs(data.blockTimestamp).format('DD/MM/YYYY, hh:mm')}
				</span> */}

				<Timer updatedAt={data.blockTimestamp} />
			</div>
		</Row>
	)
}

export default AddressBalanceHistory
