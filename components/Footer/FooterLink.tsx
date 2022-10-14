import clsx from 'clsx'
import styles from './style.module.scss'

type LinkItem = {
	label: string
	link: string
}
type ColumnLink = LinkItem[]
const footerLinks: ColumnLink[] = [
	[
		{ label: 'About us', link: '/about' },
		{ label: 'Explorer', link: '/explorer' },
		{ label: 'Bridge', link: '/bridge' },
		{ label: 'Dex exchange', link: '/dex' }
	],
	[
		{ label: 'Documents', link: '/about' },
		{ label: 'Exampies', link: '/explorer' },
		{ label: 'Whitepaper', link: '/bridge' }
	],
	[
		{ label: 'Privacy and Policy', link: '/about' },
		{ label: 'Term and Services', link: '/explorer' },
		{ label: 'FAQs', link: '/bridge' },
		{ label: 'Live Support', link: '/dex' }
	]
]

type FooterLinkProps = {
	classes?: string
}

export default function FooterLink({ classes }: FooterLinkProps) {
	return (
		<div className={clsx(styles.wrapperLinks, 'md-wrap', classes)}>
			{footerLinks.map((rows, index) => (
				<div
					key={index}
					className="col-4 md-margin-top-xl md-width-auto md-inline-margin-right"
					style={{ ['--md-margin-right' as string]: '100px' }}
				>
					{rows.map((row, index) => (
						<span
							key={row.link}
							className={clsx({
								'padding-bottom-xs': index !== rows.length - 1
							})}
						>
							<a href={row.link} className="text text-base link">
								{row.label}
							</a>
						</span>
					))}
				</div>
			))}
		</div>
	)
}
