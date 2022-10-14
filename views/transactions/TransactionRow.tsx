import { CryptoIconNames, useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import RowShowAnimation from 'components/Animation/RowShowAnimation'
import GradientRow from 'components/Row/GradientRow'
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
	feeToken?: string
	from?: string
	fromName?: string
	to?: string
	toName?: string
	height?: string
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
	feeToken,
	from,
	to,
	style = 'normal',
	height,
	fromName,
	toName
}: TransactionRowProps) {
	const { isMobile } = useMobileLayout(1220)
	const statusText = status ? 'success' : 'error'
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
						feeToken={feeToken}
						from={from}
						to={to}
						style={style}
						height={height}
						fromName={fromName}
						toName={toName}
					/>
				)}
			</GradientRow>
		</RowShowAnimation>
	)
}
