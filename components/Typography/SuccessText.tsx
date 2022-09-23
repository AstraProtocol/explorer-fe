import clsx from 'clsx'

interface Props {
	children: string
	icon?: string
	className?: string[]
}

export const SuccessText = ({ children, icon, className = [] }: Props) => {
	if (icon)
		return (
			<>
				<span className={clsx('text', 'text-sm', 'alert-color-success', icon)}></span>
				<span className={clsx('text', 'text-sm', 'alert-color-success', 'sm-margin-left-xs', ...className)}>
					{children}
				</span>
			</>
		)
	return <span className={clsx('text', 'text-sm', 'alert-color-success', ...className)}>{children}</span>
}
