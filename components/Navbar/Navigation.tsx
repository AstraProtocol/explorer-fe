import clsx from 'clsx'
import cloneDeep from 'lodash/cloneDeep'
import Link from 'next/link'
import { useRef, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import useOutsideAlerter from '../../hooks/useOutsideElement'
import styles from './style.module.scss'
export type MenuType = 'static' | 'locale'

export type SubMenuItem = {
	id: string
	label: string
	prefix?: JSX.Element
	suffix?: JSX.Element
	link?: string
	show?: boolean
	submenus?: { id: string; label: string; link: string; show?: boolean }[]
}
export type MenuItem = {
	id: string
	label?: string
	link?: string
	show?: boolean
	prefixIcon?: React.ReactNode
	submenus?: SubMenuItem[]
	type?: MenuType
}

export type NavigationProps = {
	items: MenuItem[]
}

export default function Navigation({ items }: NavigationProps) {
	const router = useRouter()
	const [_menuItems, setMenuItems] = useState(items)
	const wrapperRef = useRef(null)
	const hideMenu = () => setMenuItems(items)
	useOutsideAlerter(wrapperRef, hideMenu)

	const _renderLink = (link, text, index, len, locale = false) => {
		const span = () => (
			<span
				className={clsx(
					'text-base text-center text-bold',
					'contrast-color-70 padding-sm',
					'block-center pointer',
					{ 'radius-tl-sm radius-tr-sm': index === 0 },
					{ 'radius-bl-sm radius-br-sm': index === len - 1 }
				)}
			>
				{locale ? (
					<>
						<Image alt={link} src={`/images/flag${link}.svg`} width={30} height={19} />
						<span className="padding-left-xs">{text}</span>
					</>
				) : (
					text
				)}
			</span>
		)
		return link ? <Link href={link}>{span()}</Link> : span()
	}
	/**
	 *
	 * @param id string[]: [url level 1, url level 2 ]
	 */
	const _showSubMenu = (event: React.MouseEvent<HTMLElement>, ids: string[]) => {
		event.stopPropagation()
		let newItems = cloneDeep(items)
		let currentSubItems = newItems
		for (let id of ids) {
			if (!id) {
				break
			}
			const selectItem = currentSubItems.find(item => item.id === id)
			selectItem.show = true
			if (selectItem.submenus) {
				currentSubItems = selectItem.submenus
			} else {
				break
			}
		}
		if (ids.length > 0) {
			setMenuItems(newItems)
		}
	}

	const _renderLocale = (subitems: SubMenuItem[]) => {
		const { locale } = router
		const localeItem = subitems.find(item => item.link === `/${locale}`)
		return (
			<>
				<span className="text-base text-center text-bold contrast-color-70 padding-sm block-center pointer">
					<Image alt={locale} src={`/images/flag/${locale}.svg`} width={30} height={19} />
					<span className="padding-left-xs">{localeItem.label}</span>
				</span>
			</>
		)
	}
	return (
		<ul className={styles.navigation} ref={wrapperRef}>
			{_menuItems.map(({ link = '', prefixIcon, label, show, id, submenus: sub1, type }) => (
				<li
					key={`${link} + ${label}`}
					className={clsx(styles.item, 'margin-left-lg', 'block-center', 'padding-right-lg radius-lg', {
						[`padding-left-lg ${styles.background}`]: prefixIcon,
						'padding-right-md padding-left-xs': !prefixIcon
					})}
					cypress-id={id}
					onClick={event => _showSubMenu(event, [id])}
				>
					{type === 'locale' ? (
						_renderLocale(sub1)
					) : (
						<>
							{prefixIcon && prefixIcon}
							{_renderLink(link, label, 1, 0)}
						</>
					)}

					{sub1?.length > 0 && (
						<>
							<span className="icon-dropdown text-base" data-text="icon"></span>
							<ul
								className={clsx(styles.submenu, 'radius-sm shadow-xs', {
									[styles.show]: show,
									[styles.locale]: type === 'locale'
								})}
							>
								{sub1.map((menu, index) => (
									<li
										className={clsx({
											'border border-bottom-base': index !== sub1.length - 1
										})}
										key={`${menu.link} + ${menu.label}`}
										onClick={event => _showSubMenu(event, [id, menu.id])}
									>
										{_renderLink(menu.link, menu.label, index, sub1.length, type === 'locale')}
										{menu.submenus && (
											<ul
												className={clsx(styles.submenu2, 'contrast-bg-color-50', 'radius-xs', {
													[styles.show]: menu.show
												})}
											>
												{menu.submenus.map(sub2 => (
													<li key={`${sub2.link} + ${sub2.label}`}>
														{_renderLink(sub2.link, sub2.label, index, sub1.length, true)}
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
						</>
					)}
				</li>
			))}
		</ul>
	)
}
