import { useMobileLayout } from '@astraprotocol/astra-ui'
import { CryptoIconNames } from '@astraprotocol/astra-ui/lib/es/components/CryptoIcon'
import clsx from 'clsx'
import RowShowAnimation from 'components/Animation/RowShowAnimation'
import GradientRow from 'components/Row/GradientRow'
import { useTransactionType } from 'views/accounts/hook/useTransactionType'
import styles from './style.module.scss'
import TransactionRowContent from './TransactionRowContent'
import TransactionRowContentMobile from './TransactionRowContentMobile'

export type TransactionRowProps = {
	style?: 'normal' | 'inject'
	blockNumber: number
	updatedAt: number | string
	value?: string
	valueCurrency?: string
	valueToken?: CryptoIconNames
	newBlock?: boolean
	hash: string
	type?: string
	labelStatus?: string
	status?: boolean
	fee?: number | string
	from?: string
	fromName?: string
	to?: string
	contractAddress?: string
	toName?: string
	height?: string
	typeCount?: number
}

export default function TransactionRow({
	blockNumber,
	updatedAt,
	value,
	valueCurrency,
	valueToken,
	newBlock,
	hash,
	type,
	labelStatus,
	status,
	fee,
	from,
	to,
	contractAddress,
	style = 'normal',
	height,
	fromName,
	toName,
	typeCount
}: TransactionRowProps) {
	const { isMobile } = useMobileLayout('small')
	const statusText = status ? 'success' : 'error'
	const transactionType = useTransactionType(from, to || contractAddress)

	return (
		<RowShowAnimation action={newBlock}>
			<GradientRow
				type={statusText}
				classes={clsx(
					'padding-left-lg padding-right-lg',
					'padding-top-xs padding-bottom-xs',
					styles.rowHeight,
					{
						'margin-bottom-xs': style === 'normal',
						'radius-lg': style === 'normal',
						// 'border border-bottom-base': style === 'inject' && order === 'end',
						[styles.borderWidthPadding]: style === 'inject',
						'flex-column': isMobile
					}
				)}
				gradient={style === 'inject' ? 'transparent' : 'normal'}
			>
				{isMobile ? (
					<TransactionRowContentMobile
						key={hash}
						blockNumber={blockNumber}
						updatedAt={updatedAt}
						hash={hash}
						type={type}
						transactionType={transactionType}
					/>
				) : (
					<TransactionRowContent
						blockNumber={blockNumber}
						updatedAt={updatedAt}
						value={value}
						valueCurrency={valueCurrency}
						valueToken={valueToken}
						hash={hash}
						type={type}
						labelStatus={labelStatus}
						status={status}
						fee={fee}
						from={from}
						to={to}
						contractAddress={contractAddress}
						style={style}
						height={height}
						fromName={fromName}
						toName={toName}
						transactionType={transactionType}
						typeCount={typeCount}
					/>
				)}
			</GradientRow>
		</RowShowAnimation>
	)
}
