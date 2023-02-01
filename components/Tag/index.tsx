import clsx from 'clsx'
import style from './style.module.scss'

export type TagType = 'success' | 'error' | 'info' | 'warning' | 'primary'
interface Props {
	type: TagType
	text: string
	classes?: string
}

const Tag = ({ text, type, classes }: Props) => {
	return (
		<span className={clsx(style.tag, style[type], 'money money-2xs money-bold', `alert-color-${type}`, classes)}>
			{text}
		</span>
	)
}

export default Tag
