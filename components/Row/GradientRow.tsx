import React from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
import RowType from './RowType'

interface Props {
	children: JSX.Element[]
	type: 'success' | 'error'
}

const GradientRow = ({ children, type }: Props) => {
	return (
		<div className={clsx(styles.row, styles.blockRow, styles.gradientRow)}>
			<RowType type={type} />
			{children}
		</div>
	)
}

export default GradientRow
