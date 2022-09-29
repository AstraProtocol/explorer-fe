import clsx from 'clsx'
import React from 'react'
import styles from './style.module.scss'

interface Props {
	children: React.ReactNode
	classes?: string
}

const BackgroundCard = ({ children, classes }: Props) => {
	return <div className={clsx(styles.backgroundCard, classes, 'radius-lg')}>{children}</div>
}

export default BackgroundCard
