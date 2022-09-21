import clsx from 'clsx'
import Link from 'next/link'
import { useRef, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'

import styles from './style.module.scss'
import useOutsideAlerter from './useOutsideAlerter'
import { useRouter } from 'next/router'
import Image from 'next/image'
type MenuType = 'static' | 'locale'

type SubMenuItem = {
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
	background?: boolean
	prefixIcon?: React.ReactNode
	submenus?: SubMenuItem[]
	type?: MenuType
}

type NavigationProps = {
	items: MenuItem[]
}

export default function Navigation({ items }: NavigationProps) {
	const router = useRouter()
	const [_menuItems, setMenuItems] = useState(items)
	const wrapperRef = useRef(null)
	const hideMenu = () => setMenuItems(items)
	useOutsideAlerter(wrapperRef, hideMenu)

	const _renderLink = (link, text) => {
		const span = () => (
			<span className="text-base text-center text-bold contrast-color-70 padding-sm block-center pointer">
				{text}
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
					<Image src={`/images/flag/${locale}.svg`} width={30} height={19} />
					<span className="padding-left-xs">{localeItem.label}</span>
				</span>
			</>
		)
	}

	const _renderLocaleItems = (link, label) => {
		return (
			<>
				<span className="text-base text-bold contrast-color-70 padding-sm block-center pointer">
					<Image src={`/images/flag${link}.svg`} width={30} height={19} />
					<span className="padding-left-xs">{label}</span>
				</span>
			</>
		)
	}

	return (
		<ul className={styles.navigation} ref={wrapperRef}>
			{_menuItems.map(({ link = '', prefixIcon, label, show, id, submenus: sub1, type, background }) => (
				<li
					key={`${link} + ${label}`}
					className={clsx(styles.item, 'margin-left-lg', 'block-center', {
						[styles.background]: background,
						'padding-left-lg padding-right-lg radius-lg': background,
						'padding-right-md': !background
					})}
					onClick={event => _showSubMenu(event, [id])}
				>
					{type === 'locale' ? (
						_renderLocale(sub1)
					) : (
						<>
							{prefixIcon && prefixIcon}
							{_renderLink(link, label)}
						</>
					)}

					{sub1?.length > 0 && (
						<>
							<span className="dropdown-icon" data-text="icon"></span>
							<ul
								className={clsx(styles.submenu, 'radius-sm', 'border border-base', {
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
										{type === 'locale'
											? _renderLocaleItems(menu.link, menu.label)
											: _renderLink(menu.link, menu.label)}
										{menu.submenus && (
											<ul
												className={clsx(styles.submenu2, 'contrast-bg-color-50', 'radius-xs', {
													[styles.show]: menu.show
												})}
											>
												{menu.submenus.map(sub2 => (
													<li key={`${sub2.link} + ${sub2.label}`}>
														{_renderLink(sub2.link, sub2.label)}
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
