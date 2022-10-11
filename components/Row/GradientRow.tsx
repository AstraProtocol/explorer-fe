import clsx from 'clsx'
import React from 'react'
import RowType from './RowType'
import styles from './style.module.scss'

interface Props {
	children: React.ReactNode | React.ReactNode[]
	type: 'success' | 'error'
	classes?: string
	style?: any
	gradient?: 'normal' | 'transparent'
}

const GradientRow = ({ style, children, type, classes = 'radius-lg', gradient = 'normal' }: Props) => {
	// const arrayChildren = React.Children.toArray(children)
	return (
		<div
			style={style}
			className={clsx(styles.row, styles.blockRow, styles.gradientRow, classes, {
				[styles.gradientRowError]: type === 'error' && gradient === 'normal',
				[styles.gradientRowSuccess]: type === 'success' && gradient === 'normal',

				[styles.gradientTransparentRowError]: type === 'error' && gradient === 'transparent',
				[styles.gradientTransparentRowSuccess]: type === 'success' && gradient === 'transparent'
			})}
		>
			<RowType type={type} />
			{children}
		</div>
	)
}

export default GradientRow
