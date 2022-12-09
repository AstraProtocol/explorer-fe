import { CryptoIcon, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import { LinkText } from 'components/Typography/LinkText'
import { isUndefined } from 'lodash'
import numeral from 'numeral'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { AddressTypeEnum } from 'utils/enum'

import { convertBalanceToView, formatCurrencyValue, LinkMaker } from 'utils/helper'
import useAddressCounter from './hook/useAddressCounter'
import styles from './style.module.scss'

interface Props {
	address: string
	addressData: Address
}

const AddressOverview = ({ address, addressData }: Props) => {
	const addressCounter = useAddressCounter(address)
	const astraSummary = useAppSelector(getAstraSummary)

	const isContract = addressData.type === AddressTypeEnum.Contract
	return (
		<BackgroundCard classes={clsx('padding-lg margin-top-2xl', styles.overview)}>
			<Row style={{ justifyContent: 'space-between' }} classes={clsx(styles.borderBottom, 'padding-bottom-lg')}>
				<div>
					<span className="text text-base contrast-color-50">
						{isContract ? 'Contract' : 'Wallet Address'}
					</span>
					<br />
					<span className="text text-lg">
						{isContract ? `${addressData.contractName} (${address})` : address}
					</span>
				</div>
				<div>
					<CopyButton textCopy={address} />
					{/* <QrButton textTitle="qrcode" content={address} /> */}
				</div>
			</Row>
			{isContract && (
				<div style={{ justifyContent: 'space-between' }} className={clsx('padding-bottom-lg ')}>
					{addressData.tokenSymbol && (
						<div
							className={clsx(
								styles.borderBottom,
								'row padding-bottom-sm padding-top-sm block-ver-center'
							)}
						>
							<span className="col-2 text text-base contrast-color-50">Token</span>
							<LinkText classes="col-10" href={LinkMaker.token(address)}>
								{addressData.tokenName} ({addressData.tokenSymbol})
							</LinkText>
						</div>
					)}
					<div className={clsx(styles.borderBottom, 'row padding-bottom-sm padding-top-sm block-ver-center')}>
						<span className="col-2 text text-base contrast-color-50">Owner</span>
						<LinkText classes="col-10" href={LinkMaker.address(addressData.creator)}>
							{addressData.creator}
						</LinkText>
					</div>
					<div className={clsx(styles.borderBottom, 'row padding-bottom-sm padding-top-sm block-ver-center')}>
						<span className="col-2 text text-base contrast-color-50">Creation Hash</span>
						<LinkText classes="col-10" href={LinkMaker.transaction(addressData.creationTransaction)}>
							{addressData.creationTransaction}
						</LinkText>
					</div>
				</div>
			)}
			<Row style={{ justifyContent: 'space-between' }} classes="padding-top-lg">
				<div className={styles.colBalance}>
					<span className="text text-base contrast-color-50">Balance:</span>
					<br />
					<TypographyUI.Balance
						size="sm"
						currency={
							astraSummary && addressData.balance
								? `(${formatCurrencyValue(
										(astraSummary.last * parseInt(addressData.balance)) / 10 ** 18,
										'VND'
								  )})`
								: ''
						}
						icon={<CryptoIcon name="asa" size="sm" />}
						value={addressData.balance ? convertBalanceToView(addressData.balance) : addressData.balance}
						fixNumber={5}
					/>
				</div>
				<div className={styles.colTransaction}>
					<span className="text text-base contrast-color-50">Transactions:</span>
					<br />
					<span className="text text-base">
						{isUndefined(addressCounter.transactionCount)
							? 'NaN'
							: numeral(addressCounter.transactionCount).format('0,0')}
					</span>
				</div>
				<div className={styles.colTransfer}>
					<span className="text text-base contrast-color-50">Transfers:</span>
					<br />
					<span className="text text-base">
						{isUndefined(addressCounter?.tokenTransferCount) ? 'NaN' : addressCounter?.tokenTransferCount}
					</span>
				</div>
				<div className={styles.colGasUsed}>
					<span className="text text-base contrast-color-50">Gas used:</span>
					<br />
					<span className="text text-base">
						{isUndefined(addressCounter.transactionCount)
							? 'NaN'
							: numeral(addressCounter.gasUsageCount).format('0,0')}
					</span>
				</div>
				<div className={styles.colLastBalanceUpdated}>
					<span className="text text-base contrast-color-50">Last balance updated:</span>
					<br />

					{addressData.lastBalanceUpdate ? (
						<LinkText href={LinkMaker.block(addressData.lastBalanceUpdate)}>
							{addressData.lastBalanceUpdate}
						</LinkText>
					) : (
						<span className="text text-base">NaN</span>
					)}
				</div>
			</Row>
		</BackgroundCard>
	)
}

export default AddressOverview
