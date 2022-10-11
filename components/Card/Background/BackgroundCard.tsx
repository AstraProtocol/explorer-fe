import clsx from 'clsx'
import React from 'react'
import styles from './style.module.scss'

interface Props {
	children: React.ReactNode
	classes?: string
	backgroundColor?: boolean
	border?: boolean
}

const BackgroundCard = ({ children, classes, backgroundColor = true, border = true }: Props) => {
	return (
		<div
			className={clsx(classes, 'radius-lg', {
				[styles.background]: backgroundColor,
				'border border-base': border,
				[styles.backgroundCard]: !backgroundColor
			})}
		>
			{children}
		</div>
	)
}

export default BackgroundCard
