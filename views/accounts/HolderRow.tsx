import clsx from 'clsx'
import Typography from 'components/Typography'
import { LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type Props = {
	index: number
	account: AstraHolder
}

export default function HolderRow({ index, account }: Props) {
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
			<div className={clsx('text text-base contrast-color-70 text-center margin-right-lg')}>{index}</div>
			<div className={clsx(styles.borderLeft, 'col-5 padding-left-lg block-ver-center')}>
				<Typography.LinkText href={LinkMaker.address(account.address)} className={['text', 'text-base']}>
					{account.address}
				</Typography.LinkText>
			</div>
			<div className={clsx(styles.borderLeft, 'col-5 padding-left-lg ')}>
				<span className={clsx('money money-sm money-bold padding-right-xs')}>{account.balance}</span>
				<span className={clsx(styles.currency, 'money money-sm money-bold')}>ASA</span>
			</div>

			<div
				className={clsx(
					styles.borderLeft,
					'padding-left-lg text-center money money-xs contrast-color-70 block-ver-center col-2'
				)}
			>
				{account.txnCount}
			</div>
		</div>
	)
}
