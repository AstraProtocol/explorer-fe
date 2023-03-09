import clsx from 'clsx'
interface Props {
	children: React.ReactNode
	className?: string[]
	icon?: string
}

export const PageTitle = ({ children, icon, className = [] }: Props) => {
	if (icon)
		return (
			<>
				<span className={icon}></span>
				<span
					cypress-id="page-title"
					className={clsx(' text', 'text-2xl', 'text-bold', 'sm-margin-left-xs', ...className)}
				>
					{children}
				</span>
			</>
		)
	return (
		<span cypress-id="page-title" className={clsx(' text text-2xl text-bold contrast-color-70', ...className)}>
			{children}
		</span>
	)
}
