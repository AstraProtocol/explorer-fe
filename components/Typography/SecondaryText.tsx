import clsx from 'clsx'

interface Props {
	children: string
	className?: string[]
}

export const SecondaryText = ({ children, className = [] }: Props) => {
	return <span className={clsx('text', 'text-sm', 'contrast-color-50', ...className)}>{children}</span>
}
