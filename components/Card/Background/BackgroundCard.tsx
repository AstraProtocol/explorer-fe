import clsx from 'clsx'
import React from 'react'
import styles from './style.module.scss'

interface Props {
	children: React.ReactNode
	classes?: string
	backgroundCardBlur?: boolean
	backgroundColor?: boolean
	radius?: boolean
	border?: boolean
}

const BackgroundCard = ({
	children,
	classes,
	backgroundCardBlur = true,
	backgroundColor = true,
	radius = true,
	border = true
}: Props) => {
	return (
		<div
			className={clsx(
				radius && 'radius-lg',
				{
					[styles.background]: backgroundColor,
					'border border-base': border,
					[styles.backgroundCardBlur]: backgroundCardBlur
				},
				classes
			)}
		>
			{children}
		</div>
	)
}

export default BackgroundCard
