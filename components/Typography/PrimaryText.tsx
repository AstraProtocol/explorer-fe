import clsx from 'clsx'

interface Props {
	children: string
	className?: string[]
}

export const PrimaryText = ({ children, className = [] }: Props) => {
	return (
		<span className={clsx('text word-break-all', 'text-base', 'contrast-color-70', ...className)}>{children}</span>
	)
}
