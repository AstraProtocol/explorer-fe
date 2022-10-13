import { CryptoIcon, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import { LinkText } from 'components/Typography/LinkText'
import { LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

interface Props {
	token: string
}

const TokenOverview = ({ token }: Props) => {
	// const addressCounter = useAddressCounter(token)
	// const addressBalance = useAddressBalance(token)
	// const astraSummary = useAppSelector(getAstraSummary)

	return (
		<BackgroundCard classes="padding-lg margin-top-2xl">
			<Row style={{ justifyContent: 'space-between' }} classes={clsx(styles.borderBottom, 'padding-bottom-lg')}>
				<div>
					<span className="text text-base contrast-color-50">Wallet Address:</span>
					<br />
					<span className="text text-lg">{token}</span>
				</div>
				<div>
					<CopyButton textCopy={token} />
					{/* <QrButton textTitle="qrcode" content={token} /> */}
				</div>
			</Row>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-top-lg">
				<div className="">
					<span className="text text-base contrast-color-50">Contract:</span>
					<br />
					<LinkText href={LinkMaker.address(token)}>{token}</LinkText>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Total Supply:</span>
					<br />
					<TypographyUI.Balance
						size="sm"
						currency={'Symbol'}
						icon={<CryptoIcon name="asa" size="sm" />}
						// value={
						// 	addressBalance.balance
						// 		? convertBalanceToView(addressBalance.balance)
						// 		: addressBalance.balance
						// }
						fixNumber={5}
					/>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Holders:</span>
					<br />
					{/* <span className="text text-base">
						{addressCounter.transactionCount
							? numeral(addressCounter.transactionCount).format('0,0')
							: 'NaN'}
					</span> */}
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Transfers:</span>
					<br />
					<span className="text text-base">
						{/* {isUndefined(addressCounter?.tokenTransferCount) ? 'NaN' : addressCounter?.tokenTransferCount} */}
					</span>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Decimals:</span>
					<br />
					<span className="text text-base">
						{/* {addressCounter.transactionCount ? numeral(addressCounter.gasUsageCount).format('0,0') : 'NaN'} */}
					</span>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Token Type:</span>
					<br />

					{/* {addressBalance.lastBalanceUpdate ? (
						<LinkText href={LinkMaker.block(addressBalance.lastBalanceUpdate)}>
							{addressBalance.lastBalanceUpdate}
						</LinkText>
					) : (
						<span className="text text-base">NaN</span>
					)} */}
				</div>
			</Row>
		</BackgroundCard>
	)
}

export default TokenOverview
