import { Typography as TypographyUI } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Typography from 'components/Typography'
import numeral from 'numeral'
import { convertBalanceToView, isERC721, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type Props = {
	index: number
	account: Holder
	tokenData: Token
}

export default function TokenHolder({ index, account, tokenData }: Props) {
	const isNFT = isERC721(tokenData.type)
	let percentage = (parseFloat(account.balance) / parseFloat(tokenData.totalSupply)) * 100
	percentage = percentage < 10 ** -3 ? 0 : percentage
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
					value={account.balance ? (isNFT ? account.balance : convertBalanceToView(account.balance)) : '0'}
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
				{numeral(percentage).format('0,0.0000')}%
			</div>
		</div>
	)
}
