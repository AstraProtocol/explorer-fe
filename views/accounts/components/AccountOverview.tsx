import { CryptoIcon, formatCurrencyValue, Row, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import { isEmpty } from 'lodash'
import { useMemo } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { convertBalanceToView } from 'utils/helper'
import { getAstraTokenAmount, getTokenName } from 'views/transactions/cosmosMessage'
import styles from '../style.module.scss'

const AccountOverview = ({ addressData }) => {
	const astraSummary = useAppSelector(getAstraSummary)
	const astraPrice = astraSummary?.last || 0

	const [totalLock, totalUnvested, totalVested] = useMemo<Array<TokenAmount | undefined>>(() => {
		if (addressData.vestingBalances) {
			const { locked, unvested, vested } = addressData.vestingBalances
			let totalLockedObj: TokenAmount = undefined
			if (!isEmpty(locked)) {
				const totalLockedAmount = getAstraTokenAmount(locked)
				if (!isEmpty(totalLockedAmount)) {
					totalLockedObj = {
						amount: totalLockedAmount,
						denom: getTokenName(locked)
					}
				}
			}

			let totalUnvesteddObj: TokenAmount = undefined
			if (!isEmpty(unvested)) {
				const totalUnvestedAmount = getAstraTokenAmount(unvested)
				if (!isEmpty(totalUnvestedAmount)) {
					totalUnvesteddObj = {
						amount: totalUnvestedAmount,
						denom: getTokenName(unvested)
					}
				}
			}
			let totalVesteddObj: TokenAmount = undefined
			if (!isEmpty(vested)) {
				const totalVestedAmount = getAstraTokenAmount(vested)
				if (!isEmpty(totalVestedAmount)) {
					totalVesteddObj = {
						amount: totalVestedAmount,
						denom: getTokenName(vested)
					}
				}
			}
			return [totalLockedObj, totalUnvesteddObj, totalVesteddObj]
		}
		return [undefined, undefined, undefined]
	}, [addressData.vestingBalances])

	return addressData.vestingBalances && (totalLock || totalUnvested || totalVested) ? (
		<Row style={{ justifyContent: 'space-between' }} classes="padding-top-lg border-top-base border margin-top-lg">
			{totalVested && (
				<div className={styles.colBalance}>
					<span className="text text-base contrast-color-50">Vested:</span>
					<br />
					<TypographyUI.Balance
						size="sm"
						currency={
							totalVested.denom === 'ASA'
								? `(${formatCurrencyValue(
										Number(astraPrice) * parseFloat(utils.formatEther(totalVested.amount)),
										'VND'
								  )})`
								: totalVested.denom
						}
						icon={<CryptoIcon name={totalVested.denom.toLowerCase() as CryptoIconNames} size="sm" />}
						value={totalVested.amount ? convertBalanceToView(totalVested.amount) : totalVested.amount}
						fixNumber={5}
					/>
				</div>
			)}
			{totalUnvested && (
				<div className={styles.colBalance}>
					<span className="text text-base contrast-color-50">Unvested:</span>
					<br />
					<TypographyUI.Balance
						size="sm"
						currency={
							totalUnvested.denom === 'ASA'
								? `(${formatCurrencyValue(
										Number(astraPrice) * parseFloat(utils.formatEther(totalUnvested.amount)),
										'VND'
								  )})`
								: totalUnvested.denom
						}
						icon={<CryptoIcon name={totalUnvested.denom.toLowerCase() as CryptoIconNames} size="sm" />}
						value={totalUnvested.amount ? convertBalanceToView(totalUnvested.amount) : totalUnvested.amount}
						fixNumber={5}
					/>
				</div>
			)}
			{totalLock && (
				<div className={styles.colBalance}>
					<span className="text text-base contrast-color-50">Lock:</span>
					<br />
					<TypographyUI.Balance
						size="sm"
						currency={
							totalLock.denom === 'ASA'
								? `(${formatCurrencyValue(
										Number(astraPrice) * parseFloat(utils.formatEther(totalLock.amount)),
										'VND'
								  )})`
								: totalLock.denom
						}
						icon={<CryptoIcon name={totalLock.denom.toLowerCase() as CryptoIconNames} size="sm" />}
						value={totalLock.amount ? convertBalanceToView(totalLock.amount) : totalLock.amount}
						fixNumber={5}
					/>
				</div>
			)}
		</Row>
	) : null
}

export default AccountOverview
