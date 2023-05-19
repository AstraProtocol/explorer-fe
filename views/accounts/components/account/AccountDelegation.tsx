import { Table } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import { formatEther } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { getValidatorSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
import useAccountDelegation from 'views/accounts/hook/useAccountDelegation'
interface Props {
	addressData: Address
	address: string
}

const AccountDelegation = ({ addressData, address }: Props) => {
	const delegations = useAccountDelegation(address)
	const validators = useAppSelector(getValidatorSummary)

	const rows = useMemo((): any => {
		return (
			delegations.map(item => ({
				validatorName: {
					content: validators.find(
						(v: ValidatorData) => v.operatorAddress === item.delegation.validator_address
					)?.moniker
				},
				amount: { content: formatEther(item.balance.amount) }
			})) || []
		)
	}, [delegations, validators])

	if (delegations.length == 0) return null
	return (
		<Table
			id="account-delegation"
			colums={[
				{
					content: 'Validator',
					key: 'validatorName',
					render: value => <span className={clsx('text text-sm')}>{value || '0x'}</span>
				},
				{
					content: 'Amount',
					key: 'amount',
					render: value => <span className={clsx('text text-sm')}>{value || '...'}</span>
				}
			]}
			rows={rows}
		/>
	)
}

export default AccountDelegation
