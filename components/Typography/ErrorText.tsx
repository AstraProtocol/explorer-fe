import clsx from 'clsx'

interface Props {
	children: string
	icon?: string
	className?: string[]
}

export const ErrorText = ({ children, icon, className = [] }: Props) => {
	if (icon)
		return (
			<>
				<span className={clsx('text', 'text-sm', 'alert-color-error', icon)}></span>
				<span className={clsx('text', 'text-sm', 'alert-color-error', 'sm-margin-left-xs', ...className)}>
					{children}
				</span>
			</>
		)
	return <span className={clsx('text', 'text-sm', 'alert-color-error', ...className)}>{children}</span>
}
