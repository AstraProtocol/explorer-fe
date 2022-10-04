import clsx from 'clsx'
import React from 'react'
import styles from './style.module.scss'

interface Props {
	children: React.ReactNode
	classes?: string
	backgroundColor?: boolean
}

const BackgroundCard = ({ children, classes, backgroundColor = true }: Props) => {
	return (
		<div className={clsx(styles.backgroundCard, classes, 'radius-lg', { [styles.background]: backgroundColor })}>
			{children}
		</div>
	)
}

export default BackgroundCard
