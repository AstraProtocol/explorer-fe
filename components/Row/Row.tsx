import clsx from 'clsx'
import styles from './style.module.scss'

interface Props {
	className?: string[]
	children: JSX.Element[]
}

const Row = ({ children, className = [] }: Props) => {
	return <div className={clsx(styles.row, ...className)}>{children}</div>
}

export default Row
