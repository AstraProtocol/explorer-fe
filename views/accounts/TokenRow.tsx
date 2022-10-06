import clsx from 'clsx'
import Typography from 'components/Typography'
import { LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type Props = {
	index: number
	token: Token
	// blockNumber: number
	// size: number
	// updatedAt: number | string
	// transactions: number
	// proposerAddress: string
	// mine?: boolean
	// value: number
	// newBlock?: boolean
}

export default function TokenRow({
	index,
	token
}: // blockNumber,
// updatedAt,
// transactions,
// proposerAddress,
// mine,
// size,
// value,
// newBlock
Props) {
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
			<div className={clsx('text text-base contrast-color-70 text-center margin-right-sm')}>{index}</div>
			<div className="col-2 block-ver-center">
				<Typography.LinkText
					href={LinkMaker.token(token.contract_address_hash)}
					className={['text', 'text-base']}
				>
					{`${token.name} (${token.symbol})`}
				</Typography.LinkText>
			</div>

			<div className={clsx('col-5 padding-left-lg', styles.borderLeft)}>
				<div>
					<Typography.LinkText
						href={LinkMaker.address(token.contract_address_hash)}
						className={['text', 'text-sm']}
					>
						{token.contract_address_hash}
					</Typography.LinkText>
				</div>
				{/* <div className={clsx('block-ver-center', styles.info)}>
					<span className={clsx('money money-sm money-bold')}>{10000}</span>
					<span className={clsx(styles.currency, 'money money-sm money-bold')}>USDT</span>
				</div> */}
			</div>

			<div className="col-4 block-ver-center">
				<span className={clsx('money money-sm money-bold padding-right-xs')}>{token.total_supply}</span>
				<span className={clsx(styles.currency, 'money money-sm money-bold')}>{token.symbol}</span>
			</div>

			<div className="padding-left-lg text-center money money-xs contrast-color-70 block-ver-center">
				{token.holder_count}
			</div>
		</div>
	)
}
