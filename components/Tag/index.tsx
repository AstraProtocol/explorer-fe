import clsx from 'clsx'
import style from './style.module.scss'

interface Props {
	type: 'success' | 'error' | 'info' | 'warning' | 'primary'
	text: string
	classes?: string
}

const Tag = ({ text, type, classes }: Props) => {
	return (
		<span className={clsx(style.tag, style[type], 'money money-xs', 'money-bold', `alert-color-${type}`, classes)}>
			{text}
		</span>
	)
}

export default Tag
