import clsx from 'clsx'
import styles from './style.module.scss'

interface Props {
	children: JSX.Element | JSX.Element[]
	classes?: string
}

const BackgroundCard = ({ children, classes }: Props) => {
	return <div className={clsx(styles.backgroundCard, classes)}>{children}</div>
}

export default BackgroundCard
