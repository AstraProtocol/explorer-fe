import clsx from 'clsx'
import React from 'react'
import RowType from './RowType'
import styles from './style.module.scss'

interface Props {
	children: React.ReactNode
	type: 'success' | 'error'
	classes?: string[]
}

const GradientRow = ({ children, type, classes = [] }: Props) => {
	return (
		<div
			className={clsx(styles.row, styles.blockRow, styles.gradientRow, ...classes, {
				[styles.gradientRowError]: type === 'error',
				[styles.gradientRowSuccess]: type === 'success'
			})}
		>
			<RowType type={type} />
			{children}
		</div>
	)
}

export default GradientRow
