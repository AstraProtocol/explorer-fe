import clsx from 'clsx'
import Link from 'next/link'

type LinkFont = 'Titi' | 'Manrope'
interface Props {
	fontType?: LinkFont
	children: React.ReactNode
	classes?: string
	href: string
	fontSize?: string
	openInNewPage?: boolean
}

export const LinkText = ({ fontType = 'Manrope', children, classes, href, fontSize, openInNewPage }: Props) => {
	return (
		<Link href={href} passHref>
			<a
				target={openInNewPage ? '_blank' : '_self'}
				rel="noreferrer"
				className={clsx(
					'link',
					'link-color-useful ',
					{
						'text font-500': fontType === 'Manrope',
						'money font-500': fontType === 'Titi'
					},
					fontSize || (fontType == 'Titi' ? 'money-sm' : 'text-base'),
					classes
				)}
			>
				{children}
			</a>
		</Link>
	)
}
