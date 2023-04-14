import { CryptoIcon, formatCurrencyValue, Row, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { isEmpty } from 'lodash'
import { useMemo } from 'react'
import { getAstraSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import { convertBalanceToView } from 'utils/helper'
import { getAstraTokenAmount } from 'views/transactions/cosmosMessage'
import styles from '../../style.module.scss'

const VestingView = ({
	label,
	value,
	astraPrice
}: {
	astraPrice: number | string
	label: string
	value: string | undefined
}) => {
	if (isEmpty(value) || value === '0') return <></>
	return (
		<div className={styles.colBalance}>
			<span className="text text-base contrast-color-50">{label}:</span>
			<br />
			<TypographyUI.Balance
				size="sm"
				currency={`(${formatCurrencyValue(Number(astraPrice) * parseFloat(formatEther(value)), 'VND')})`}
				icon={<CryptoIcon name={process.env.NEXT_PUBLIC_NATIVE_TOKEN as CryptoIconNames} size="sm" />}
				value={convertBalanceToView(value)}
				fixNumber={5}
			/>
		</div>
	)
}

const AccountVesting = ({ addressData }) => {
	const astraSummary = useAppSelector(getAstraSummary)
	const astraPrice = astraSummary?.last || 0

	const [totalLock, totalUnvested, totalVested] = useMemo<Array<string | undefined>>(() => {
		if (addressData.vestingBalances) {
			const { locked, unvested, vested } = addressData.vestingBalances
			const totalLockedAmount = getAstraTokenAmount(locked)
			const totalUnvestedAmount = getAstraTokenAmount(unvested)
			const totalVestedAmount = getAstraTokenAmount(vested)

			return [totalLockedAmount, totalUnvestedAmount, totalVestedAmount]
		}
		return [undefined, undefined, undefined]
	}, [addressData.vestingBalances])

	return (
		addressData.vestingBalances &&
		(parseEther(totalLock).gt(0) || parseEther(totalUnvested).gt(0) || parseEther(totalVested).gt(0)) && (
			<Row classes="padding-bottom-lg padding-top-lg border-bottom-base border">
				<VestingView astraPrice={astraPrice} label="Vested" value={totalVested} />
				<VestingView astraPrice={astraPrice} label="Unvested" value={totalUnvested} />
				<VestingView astraPrice={astraPrice} label="Lock" value={totalLock} />
			</Row>
		)
	)
}

export default AccountVesting
