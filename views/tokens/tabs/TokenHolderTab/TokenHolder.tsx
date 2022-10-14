import { CryptoIcon, Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Typography from 'components/Typography'
import { convertBalanceToView, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type Props = {
	index: number
	account: Holder
}

export default function TokenHolder({ index, account }: Props) {
	return (
		<div
			className={clsx(
				styles.holderRow,
				'row padding-left-lg',
				'padding-right-lg padding-top-sm padding-bottom-sm',
				'radius-lg',
				'margin-bottom-xs'
			)}
		>
			<div className={clsx('text text-base contrast-color-70 text-center margin-right-lg')}>{index}</div>
			<div className={clsx(styles.borderLeft, 'col-5 padding-left-lg block-ver-center')}>
				<Typography.LinkText href={LinkMaker.address(account.address)} classes={'text text-base'}>
					{account.address}
				</Typography.LinkText>
			</div>
			<div className={clsx(styles.borderLeft, 'col-5 padding-left-lg ')}>
				{/* <span className={clsx('money money-sm  padding-right-xs')}>
					{convertBalanceToView(account.balance)}
				</span>
				<span className={clsx(styles.currency, 'money money-sm ')}>ASA</span> */}
				<TypographyUI.Balance
					size="sm"
					currency={'ASA'}
					icon={<CryptoIcon name="asa" size="sm" />}
					value={account.balance ? convertBalanceToView(account.balance) : account.balance}
					fixNumber={5}
				/>
			</div>

			<div
				className={clsx(
					styles.borderLeft,
					'padding-left-lg text-center money money-2xs contrast-color-70 block-ver-center col-2'
				)}
			>
				aa/totalsupply %{/* {account.txnCount} */}
			</div>
		</div>
	)
}
