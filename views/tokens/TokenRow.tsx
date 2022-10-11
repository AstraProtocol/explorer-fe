import clsx from 'clsx'
import Typography from 'components/Typography'
import { LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type Props = {
	key: string | number
	index: number
	token: Token
}

export default function TokenRow({ index, token }: Props) {
	return (
		<div
			className={clsx(
				styles.rowBrief,
				styles.tokenRow,
				'row padding-left-lg',
				'padding-right-lg padding-top-sm padding-bottom-sm',
				'radius-lg',
				'margin-bottom-xs'
			)}
		>
			<div className={clsx(styles.countIndex, 'text text-base contrast-color-70 padding-right-lg')}>{index}</div>
			<div className={clsx(styles.borderLeft, 'col-3 padding-left-lg block-ver-center')}>
				<Typography.LinkText href={LinkMaker.token(token.contractAddressHash)} classes={'text text-base'}>
					{`${token.name} (${token.symbol})`}
				</Typography.LinkText>
			</div>

			<div className={clsx('col-4 padding-left-lg', styles.borderLeft)}>
				<Typography.LinkText href={LinkMaker.address(token.contractAddressHash)} classes={'text text-sm'}>
					{token.contractAddressHash}
				</Typography.LinkText>
			</div>

			<div className={clsx(styles.borderLeft, 'padding-left-lg col-4')}>
				<span className={clsx('money money-sm money-bold padding-right-xs')}>{token.totalSupply}</span>
				<span className={clsx(styles.currency, 'money money-sm money-bold')}>{token.symbol}</span>
			</div>

			<div
				className={clsx(
					styles.borderLeft,
					'padding-left-lg text-center money money-2xs contrast-color-70 block-ver-center'
				)}
			>
				{token.holderCount}
			</div>
		</div>
	)
}
