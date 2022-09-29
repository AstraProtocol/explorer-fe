import clsx from 'clsx'
import styles from './style.module.scss'

interface Props {
	className?: string[]
	children: JSX.Element[]
}

const Col = ({ children, className = [] }: Props) => {
	return <div className={clsx(styles.col, ...className)}>{children}</div>
}

export default Col
