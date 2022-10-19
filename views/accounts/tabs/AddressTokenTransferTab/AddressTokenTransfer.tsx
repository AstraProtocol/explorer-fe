import clsx from 'clsx'
import Row from 'components/Grid/Row'
import GradientRow from 'components/Row/GradientRow'
import Timer from 'components/Timer'
import Typography from 'components/Typography'
import { LinkText } from 'components/Typography/LinkText'
import Tag from 'components/Typography/Tag'
import numeral from 'numeral'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import style from './style.module.scss'

interface Props {
	data: TokenTransfer
}

const AddressTokenTransfer = ({ data }: Props) => {
	return (
		<GradientRow
			style={{ justifyContent: 'space-between' }}
			type="success"
			gradient="transparent"
			classes={clsx(
				'padding-left-lg padding-right-lg padding-top-xs padding-bottom-xs',
				style.borderWidthPadding
			)}
		>
			<div style={{ textAlign: 'left' }} className={clsx('col-7', style.colAddress)}>
				<Row>
					<LinkText classes={style.address} fontType="Titi" href={LinkMaker.transaction(data.hash)}>
						{ellipseBetweenText(data.hash, 20, 20)}
					</LinkText>
					{data.contractMethodName && (
						<Tag hasArrowRight={false} fontType="Titi" text={data.contractMethodName} />
					)}
				</Row>
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
			<div className={clsx('col-2', style.colBlock)}>
				<LinkText classes="margin-left-lg" href={LinkMaker.block(data.blockNumber)}>
					#{data.blockNumber}
				</LinkText>
			</div>
			<div className={clsx('col-2 margin-left-xs', style.colFee)}>
				{/* <TypographyUI.Balance
					size="sm"
					currency=""
					icon={<CryptoIcon name="asa" size="sm" />}
					value={data.value ? convertBalanceToView(data.value) : data.value}
					fixNumber={5}
				/>
				<br /> */}
				<span className="text text-xs contrast-color-70">Fee: </span>
				<span className="money money-xs contrast-color-70">
					{numeral(parseInt(data.gasUsed) / 10 ** 9).format('0,0.000000000')} ASA
				</span>
			</div>
			<div className={clsx('col-1 margin-left-xs', style.colTimer)}>
				<Timer updatedAt={parseInt(data.timeStamp) * 1000} />
			</div>
			<div className={clsx('col-1 margin-left-xs', style.colStatus)}>
				<Typography.SuccessText>Success</Typography.SuccessText>
			</div>
		</GradientRow>
	)
}

export default AddressTokenTransfer
