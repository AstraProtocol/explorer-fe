import React from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'

interface Props {
	children: JSX.Element[]
}

const BackgroundRow = ({ children }: Props) => {
	return <div className={clsx(styles.row, styles.blockRow, styles.backgroundRow)}>{children}</div>
}

export default BackgroundRow
