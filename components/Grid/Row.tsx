import clsx from 'clsx'
import styles from './style.module.scss'

interface Props {
	classes?: string
	children: JSX.Element[]
	style?: any
}

const Row = ({ children, style, classes = '' }: Props) => {
	return (
		<div style={style} className={clsx(styles.row, classes)}>
			{children}
		</div>
	)
}

export default Row
