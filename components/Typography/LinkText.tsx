import clsx from 'clsx'
import Link from 'next/link'

type LinkFont = 'Titi' | 'Manrope'
interface Props {
	fontType?: LinkFont
	children: React.ReactNode
	className?: string[]
	href: string
	fontSize?: string
}

export const LinkText = ({ fontType = 'Manrope', children, className = [], href, fontSize }: Props) => {
	return (
		<Link href={href}>
			<span
				className={clsx(
					'link',
					'alert-color-primary ',
					fontSize || (fontType == 'Titi' ? 'money-sm' : 'text-base'),
					...className,
					{
						'text font-500': fontType === 'Manrope',
						'money font-500': fontType === 'Titi'
					}
				)}
			>
				{children}
			</span>
		</Link>
	)
}
