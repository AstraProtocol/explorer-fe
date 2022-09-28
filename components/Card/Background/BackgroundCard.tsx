import clsx from 'clsx'
import React from 'react'
import styles from './style.module.scss'

interface Props {
	classes?: string[]
	children: React.ReactNode
}

const BackgroundCard = ({ children, classes = [] }: Props) => {
	return <div className={clsx(styles.backgroundCard, 'radius-lg', ...classes)}>{children}</div>
}

export default BackgroundCard
