import clsx from 'clsx'
import Link from 'next/link'

type LinkFont = 'Titi' | 'Manrope'
interface Props {
	fontType?: LinkFont
	children: React.ReactNode
	classes?: string
	href: string
	fontSize?: string
}

export const LinkText = ({ fontType = 'Manrope', children, classes, href, fontSize }: Props) => {
	return (
		<Link href={href}>
			<span
				className={clsx(
					'link',
					'alert-color-primary ',
					fontSize || (fontType == 'Titi' ? 'money-sm' : 'text-base'),
					classes,
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
