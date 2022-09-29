import clsx from 'clsx'
import Link from 'next/link'

interface Props {
	children: string
	className?: string[]
	href: string
}

export const LinkText = ({ children, className = [], href }: Props) => {
	return (
		<Link href={href}>
			<span className={clsx('text', 'text-base', 'link', 'alert-color-primary', ...className)}>{children}</span>
		</Link>
	)
}
