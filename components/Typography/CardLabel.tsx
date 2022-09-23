import clsx from 'clsx'

interface Props {
	children: string
	className?: string[]
}

export const CardLabel = ({ children, className = [] }: Props) => {
	return <span className={clsx('text', 'text-base', 'contrast-color-50', ...className)}>{children}</span>
}
