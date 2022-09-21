import clsx from 'clsx'
import Link from 'next/link'
import { useRef, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'

import styles from './style.module.scss'
import useOutsideAlerter from './useOutsideAlerter'

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
	label: string
	link?: string
	show?: boolean
	submenus?: SubMenuItem[]
}

type NavigationProps = {
	items: MenuItem[]
}

export default function Navigation({ items }: NavigationProps) {
	const [_menuItems, setMenuItems] = useState(items)
	const wrapperRef = useRef(null)
	const hideMenu = () => setMenuItems(items)
	useOutsideAlerter(wrapperRef, hideMenu)

	const _renderLink = (link, text) => {
		return link ? (
			<Link href={link}>
				<span className="text-bold contrast-color-70">{text}</span>
			</Link>
		) : (
			<span className="text-bold contrast-color-70">{text}</span>
		)
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

	return (
		<ul className={styles.navigation} ref={wrapperRef}>
			{_menuItems.map(({ link, label, show, id, submenus: sub1 }) => (
				<li
					key={`${link} + ${label}`}
					className={clsx(styles.item, 'margin-left-lg', 'padding-left-md', 'padding-sm', 'padding-right-md')}
					onClick={event => _showSubMenu(event, [id])}
				>
					{_renderLink(link, label)}
					{sub1?.length > 0 && (
						<ul
							className={clsx(styles.submenu, 'same-bg-color-100', 'radius-sm', "border-solid border-sm", {
								[styles.show]: show
							})}
						>
							{sub1.map(menu => (
								<li
									className={clsx('padding-left-md padding-sm')}
									key={`${menu.link} + ${menu.label}`}
									onClick={event => _showSubMenu(event, [id, menu.id])}
								>
									{_renderLink(menu.link, menu.label)}
									{menu.submenus && (
										<ul
											className={clsx(styles.submenu2, 'contrast-bg-color-100', 'radius-xs', {
												[styles.show]: menu.show
											})}
										>
											{menu.submenus.map(sub2 => (
												<li
													className={clsx('padding-left-md padding-sm')}
													key={`${sub2.link} + ${sub2.label}`}
												>
													{_renderLink(sub2.link, sub2.label)}
												</li>
											))}
										</ul>
									)}
								</li>
							))}
						</ul>
					)}
				</li>
			))}
		</ul>
	)
}
