import React from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'

interface Props {
	type: 'success' | 'error'
}

const RowType = ({ type }: Props) => {
	const style = type === 'success' ? styles.success : styles.error
	return <div className={clsx(styles.rowType, style)}></div>
}

export default RowType
