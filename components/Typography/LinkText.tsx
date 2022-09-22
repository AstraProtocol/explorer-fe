import clsx from 'clsx'

interface Props {
	children: string
	className?: string[]
	href: string
}

export const LinkText = ({ children, className = [], href }: Props) => {
	return (
		<a href={href} className={clsx('text', 'text-base', 'link alert-color-primary', ...className)}>
			{children}
		</a>
	)
}
