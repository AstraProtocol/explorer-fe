import { CryptoIcon, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import QrButton from 'components/Button/QrButton'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import { LinkText } from 'components/Typography/LinkText'
import { isUndefined } from 'lodash'
import numeral from 'numeral'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { convertBalanceToView, formatCurrencyValue, LinkMaker } from 'utils/helper'
import useAddressBalance from './hook/useAddressBalance'
import useAddressCounter from './hook/useAddressCounter'
import styles from './style.module.scss'

interface Props {
	address: string
}

const AddressOverview = ({ address }: Props) => {
	const addressCounter = useAddressCounter(address)
	const addressBalance = useAddressBalance(address)
	const astraSummary = useAppSelector(getAstraSummary)

	return (
		<BackgroundCard classes="padding-lg margin-top-2xl">
			<Row style={{ justifyContent: 'space-between' }} classes={clsx(styles.borderBottom, 'padding-bottom-lg')}>
				<div>
					<span className="text text-base contrast-color-50">Wallet Address:</span>
					<br />
					<span className="text text-lg">{address}</span>
				</div>
				<div>
					<CopyButton textCopy={address} />
					<QrButton textTitle="qrcode" content={address} />
				</div>
			</Row>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-top-lg">
				<div className="">
					<span className="text text-base contrast-color-50">Balance:</span>
					<br />
					<TypographyUI.Balance
						size="sm"
						currency={
							astraSummary && addressBalance.balance
								? `(${formatCurrencyValue(
										(astraSummary.last * parseInt(addressBalance.balance)) / 10 ** 18,
										'VND'
								  )})`
								: ''
						}
						icon={<CryptoIcon name="asa" size="sm" />}
						value={
							addressBalance.balance
								? convertBalanceToView(addressBalance.balance)
								: addressBalance.balance
						}
						fixNumber={5}
					/>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Transactions:</span>
					<br />
					<span className="text text-base">
						{addressCounter.transactionCount
							? numeral(addressCounter.transactionCount).format('0,0')
							: 'NaN'}
					</span>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Transfers:</span>
					<br />
					<span className="text text-base">
						{isUndefined(addressCounter?.tokenTransferCount) ? 'NaN' : addressCounter?.tokenTransferCount}
					</span>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Gas used:</span>
					<br />
					<span className="text text-base">
						{addressCounter.transactionCount ? numeral(addressCounter.gasUsageCount).format('0,0') : 'NaN'}
					</span>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Last balance updated:</span>
					<br />
					<LinkText href={LinkMaker.block(addressBalance.lastBalanceUpdate)}>
						{addressBalance.lastBalanceUpdate}
					</LinkText>
				</div>
			</Row>
		</BackgroundCard>
	)
}

export default AddressOverview
