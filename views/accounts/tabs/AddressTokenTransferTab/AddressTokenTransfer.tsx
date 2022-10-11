import { CryptoIcon, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import Row from 'components/Grid/Row'
import GradientRow from 'components/Row/GradientRow'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { LinkText } from 'components/Typography/LinkText'
import Tag from 'components/Typography/Tag'
import numeral from 'numeral'
import { convertBalanceToView, ellipseBetweenText, LinkMaker } from 'utils/helper'

interface Props {
	data: TokenTransfer
}

const AddressTokenTransfer = ({ data }: Props) => {
	return (
		<GradientRow
			style={{ justifyContent: 'space-between' }}
			type="success"
			gradient="normal"
			classes="padding-left-lg padding-right-lg padding-top-xs padding-bottom-xs border border-bottom-base"
		>
			<div style={{ textAlign: 'left' }} className="col-5">
				<Row style={{ justifyContent: 'space-between' }}>
					<LinkText fontType="Titi" href={LinkMaker.transaction(data.hash)}>
						{ellipseBetweenText(data.hash, 20, 20)}
					</LinkText>
					<Tag hasArrowRight={false} fontType="Titi" text={'Function Name'} />
				</Row>
				{/* <br /> */}
				<div>
					<span className="margin-right-lg">
						<span className="text text-sm contrast-color-30">From </span>
						<span className="money money-2xs contrast-color-70">{ellipseBetweenText(data.from)}</span>
					</span>
					<span>
						<span className="text text-sm contrast-color-30">To </span>
						<span className="money money-2xs contrast-color-70">{ellipseBetweenText(data.to)}</span>
					</span>
				</div>
			</div>
			<div>
				{/* <Tag text="Contract call" /> */}
				<LinkText classes="margin-left-lg" href={LinkMaker.block(data.blockNumber)}>
					#{data.blockNumber}
				</LinkText>
			</div>
			<div>
				<TypographyUI.Balance
					size="sm"
					currency=""
					icon={<CryptoIcon name="asa" size="sm" />}
					value={data.value ? convertBalanceToView(data.value) : data.value}
					fixNumber={5}
				/>
				<br />
				<span className="text text-xs contrast-color-70">Fee: </span>
				<span className="money money-xs contrast-color-70">
					{numeral(parseInt(data.gasUsed) / 10 ** 9).format('0,0.000000000')} ASA
				</span>
			</div>
			<div>
				<Timer updatedAt={parseInt(data.timeStamp) * 1000} />
			</div>
			<div>
				{data.confirmations ? (
					<Typography.SuccessText>Success</Typography.SuccessText>
				) : (
					<Typography.ErrorText>Error</Typography.ErrorText>
				)}
			</div>
		</GradientRow>
	)
}

export default AddressTokenTransfer
