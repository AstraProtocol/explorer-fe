import { Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Typography from 'components/Typography'
import numeral from 'numeral'
import { convertBalanceToView, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type Props = {
	index: number
	account: Holder
	tokenData: Token
}

export default function TokenHolder({ index, account, tokenData }: Props) {
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
			<div className={clsx('text text-base contrast-color-70 text-center', styles.colIndex)}>{index}</div>
			<div className={clsx(styles.borderLeft, styles.colAddress, 'col-6 padding-left-lg block-ver-center')}>
				<Typography.LinkText href={LinkMaker.address(account.address)} classes={'text text-base'}>
					{account.address}
				</Typography.LinkText>
			</div>
			<div className={clsx(styles.borderLeft, styles.colBalance, 'col-4 padding-left-lg ')}>
				<TypographyUI.Balance
					size="sm"
					currency={tokenData.symbol}
					value={account.balance ? convertBalanceToView(account.balance) : account.balance}
					fixNumber={5}
				/>
			</div>

			<div
				className={clsx(
					styles.borderLeft,
					styles.colPower,
					'padding-left-lg text-center money money-2xs contrast-color-70 block-ver-center col-2'
				)}
			>
				{numeral((parseFloat(account.balance) / parseFloat(tokenData.totalSupply)) * 100).format('0,0.00')}%
			</div>
		</div>
	)
}
