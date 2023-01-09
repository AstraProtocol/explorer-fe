import clsx from 'clsx'
import Collapse, { CollapseProps } from 'components/Collapse'
import Typography from 'components/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MenuItem } from './Navigation'
import styles from './style.module.scss'

type MobileNavigationProps = {
	items: MenuItem[]
}

type LinkItem = {
	text: string
	link?: string
}

const Checked = () => <span className="icon-checked alert-color-success block-ver-center"></span>

const LinkMenuItem = ({
	link,
	label,
	pathname,
	classes,
	prefix
}: {
	link?: string
	label?: string
	pathname?: string
	classes?: string
	prefix?: React.ReactNode
}) => (
	<div
		className={clsx('radius-base', 'padding-sm', styles.subItem, {
			[styles.subActive]: pathname === link
		})}
	>
		<span className="block-center">
			{!!prefix && prefix}
			<Typography.LinkText href={link} classes={clsx('text text-lg', styles.link, classes)}>
				{label}
			</Typography.LinkText>
		</span>
		{pathname === link && <Checked />}
	</div>
)

export default function MoibleNavigation({ items }: MobileNavigationProps) {
	const router = useRouter()
	const { pathname, locale } = router

	const _renderMenu = () => {
		const menus: React.ReactNode[] = []
		let titleElement = null
		for (let item of items) {
			if (item.submenus) {
				let subCollapse = []
				if (item.type == 'locale') {
					const localeItem = item.submenus.find(item => item.link === `/${locale}`)
					titleElement = (
						<>
							<span
								className={clsx(
									'text-base text-center text-bold',
									'contrast-color-70',
									'block-center pointer padding-top-xs'
								)}
							>
								<Image alt={locale} src={`/images/flag/${locale}.svg`} width={30} height={19} />
								<span className="padding-left-xs">{localeItem.label}</span>
							</span>
						</>
					)
					subCollapse = item.submenus.map(item => ({
						element: (
							<LinkMenuItem
								link={item.link}
								label={item.label}
								pathname={pathname}
								classes={'padding-left-xs'}
								key={item.label}
								prefix={
									<span className="padding-left-md">
										<Image
											alt={locale}
											src={`/images/flag/${item.link}.svg`}
											width={30}
											height={19}
										/>
									</span>
								}
							/>
						)
					}))
				} else {
					titleElement = (
						<span>
							{item.label} {item.prefixIcon}
						</span>
					)
					subCollapse = item.submenus.map(item => ({
						element: (
							<LinkMenuItem
								link={item.link}
								label={item.label}
								key={item.label}
								pathname={pathname}
								classes={'padding-left-md'}
								prefix={item.prefix}
							/>
						)
					}))
				}

				const collapse: CollapseProps = {
					title: titleElement,
					items: subCollapse
				}
				menus.push(<Collapse key={item.label} {...collapse} />)
			} else {
				menus.push(<LinkMenuItem key={item.label} link={item.link} label={item.label} pathname={pathname} />)
			}
		}
		return menus
	}
	return <>{_renderMenu()}</>
}
