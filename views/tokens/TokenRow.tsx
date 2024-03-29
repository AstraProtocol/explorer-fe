import { ellipseBetweenText } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Typography from 'components/Typography'
import { convertBalanceToView, ellipseRightText, isERC721, LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type Props = {
	key: string | number
	index: number
	token: Token
}

export default function TokenRow({ index, token }: Props) {
	const isNFT = isERC721(token.type)
	return (
		<div
			className={clsx(
				styles.rowBrief,
				styles.tokenRow,
				'row padding-left-lg',
				'padding-right-lg padding-top-sm padding-bottom-sm',
				'radius-lg',
				'margin-bottom-xs',
				'row'
			)}
		>
			<div
				className={clsx(styles.colIndex, 'col text text-base contrast-color-70 text-center')}
				style={{ minWidth: '30px' }}
			>
				{index}
			</div>
			<div className={clsx(styles.borderLeft, styles.colToken, 'col col-3 padding-left-lg')}>
				<Typography.LinkText href={LinkMaker.token(token.contractAddressHash)} classes={'text text-base'}>
					{ellipseRightText(`${token.name} (${token.symbol})`, 25)}
				</Typography.LinkText>
			</div>

			<div className={clsx('col col-3 padding-left-lg', styles.borderLeft, styles.colAddress)}>
				<Typography.LinkText href={LinkMaker.address(token.contractAddressHash)} classes={'text text-sm'}>
					{token.contractAddressName
						? `${token.contractAddressName} (${ellipseBetweenText(token.contractAddressHash, 8, 6)})`
						: token.contractAddressHash}
				</Typography.LinkText>
			</div>

			<div className={clsx(styles.borderLeft, styles.colTotalSupply, 'col padding-left-lg col-3')}>
				<span className={clsx('money money-sm money-bold padding-right-xs')}>
					{convertBalanceToView(token.totalSupply, token.decimals)}
				</span>
				<span className={clsx(styles.currency, 'money money-sm money-bold')}>{token.symbol}</span>
			</div>

			<div
				className={clsx(
					styles.borderLeft,
					styles.colHolderCount,
					'col col-2 padding-left-lg text-center money money-2xs contrast-color-70 block-ver-center'
				)}
			>
				{token.holderCount}
			</div>
		</div>
	)
}
