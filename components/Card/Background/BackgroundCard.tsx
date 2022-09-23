import React from 'react'
import styles from './style.module.scss'

interface Props {
	children: React.ReactElement
}

const BackgroundCard = ({ children }: Props) => {
	return <div className={styles.backgroundCard}>{children}</div>
}

export default BackgroundCard