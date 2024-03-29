import { ethToAstra } from '@astradefi/address-converter'
import { CopyButton, CryptoIcon, IconButton, IconEnum, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import { LinkText } from 'components/Typography/LinkText'
import { isEmpty, isUndefined } from 'lodash'
import numeral from 'numeral'
import { useState } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { AddressTypeEnum } from 'utils/enum'

import {
	calculateAmountInVND,
	convertBalanceToView,
	formatCurrencyValue,
	getAmountFromBignumber,
	LinkMaker
} from 'utils/helper'
import AccountOverview from './components/account/AccountOverview'
import ContractOverview from './components/ContractOverview'
import ValidatorOverview from './components/ValidatorOverview'
import useAddressCounter from './hook/useAddressCounter'
import styles from './style.module.scss'

interface Props {
	validator: ValidatorData
	address: string
	addressData: Address
}

enum DisplayMode {
	EVM = 1,
	COSMOS = -1
}

const AddressOverview = ({ validator, address, addressData }: Props) => {
	const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.EVM)

	const addressCounter = useAddressCounter(address)
	const astraSummary = useAppSelector(getAstraSummary)
	const isValidator = !isEmpty(validator)
	const isContract = addressData.type === AddressTypeEnum.Contract

	const astraPrice = astraSummary?.last || '0'
	return (
		<BackgroundCard classes={clsx('padding-lg margin-top-2xl', styles.overview)}>
			<div className={clsx(styles.borderBottom, 'padding-bottom-lg')}>
				<span className="text text-base contrast-color-50">
					{isValidator ? 'Validator' : isContract ? 'Contract' : 'Wallet Address'}
				</span>
				<br />
				<div>
					{isValidator ? (
						<Row>
							<span className="text text-lg">
								{displayMode === DisplayMode.EVM
									? `${validator.moniker} (${address})`
									: `${validator.moniker} (${validator.initialDelegatorAddress})`}
							</span>
							<IconButton
								classes="margin-left-xs"
								onClick={() => setDisplayMode(displayMode * -1)}
								icon={IconEnum.ICON_SWAP_LEFT_RIGHT}
							/>
							<CopyButton textCopy={address} />
						</Row>
					) : isContract ? (
						<Row>
							<span className="text text-lg">
								{addressData.contractName ? `${addressData.contractName} (${address})` : address}
							</span>
							<CopyButton textCopy={address} />
						</Row>
					) : (
						<Row>
							<span className="text text-lg">
								{displayMode === DisplayMode.EVM ? address : ethToAstra(address)}
							</span>
							<IconButton
								classes="margin-left-xs"
								onClick={() => setDisplayMode(displayMode * -1)}
								icon={IconEnum.ICON_SWAP_LEFT_RIGHT}
							/>
							<CopyButton textCopy={address} />
						</Row>
					)}
				</div>
			</div>
			{isValidator ? (
				<ValidatorOverview validator={validator} />
			) : isContract ? (
				<ContractOverview addressData={addressData} address={address} />
			) : (
				<AccountOverview addressData={addressData} address={address} />
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
										calculateAmountInVND(getAmountFromBignumber(addressData.balance), astraPrice),
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
				<div className={clsx(styles.colTransfer)}>
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
