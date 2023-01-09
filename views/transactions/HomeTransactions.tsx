import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import DotSpace from 'components/DotSpace'
import RowLoader from 'components/Loader/RowLoader'
import Typography from 'components/Typography'
import { LinkMaker } from 'utils/helper'
import useTransaction from './hook/useTransaction'
import RowBrief from './TransactionBriefRow'

import styles from './style.module.scss'

export function HomeTransactions() {
	const { top10 } = useTransaction()
	return (
		<div className={'height-100 flex flex-column'}>
			<div
				className="block-ver-center margin-bottom-md  md-inline-margin-top"
				style={{ ['--md-margin-top' as string]: '56px' }}
			>
				<span className={clsx('contrast-color-70')}>Latest Transactions</span>
				<DotSpace />
				<Typography.LinkText href={LinkMaker.transaction()}>
					<span className="secondary-color-lighter">
						View all <span className="md-hide">Transactions</span>
					</span>
				</Typography.LinkText>
			</div>

			{!top10 || top10.length === 0 ? (
				<RowLoader row={10} />
			) : (
				<BackgroundCard
					classes={clsx(styles.card, 'height-100 flex flex-column padding-bottom-sm', {
						[styles.cardEmpty]: top10.length < 10
					})}
				>
					{top10?.map((item, index) => (
						<RowBrief
							key={`${item.blockHeight}-${item.hash}`}
							hash={item.evmHash || item.hash}
							balance={{ value: '' }} //{{ value: convertBalanceToView('000'), token: 'ASA' }}
							from={item.from}
							to={item.to}
							evmType={item.evmType}
							updatedAt={item.blockTime}
							newTransaction={item.newTransaction}
							border={index !== top10.length - 1 && top10.length < 10}
							transactionType={item?.messages[0]?.type}
							fullBox={top10.length < 10}
						/>
					))}
				</BackgroundCard>
			)}
		</div>
	)
}
