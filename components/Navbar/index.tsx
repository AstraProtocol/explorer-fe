import { ModalWrapper } from '@astraprotocol/astra-ui'
import clsx from 'clsx'

import useOutsideElement from 'hooks/useOutsideElement'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Logo from '../Logo'
import LiveIcon from './LiveIcon'
import MoibleNavigation from './MobileNavigation'
import Navigation, { MenuItem } from './Navigation'
import styles from './style.module.scss'
import SwitchTheme from './SwitchTheme'

export const items: MenuItem[] = [
	{
		id: '1',
		label: 'Blocks',
		link: '/blocks'
		// submenus: [
		// 	{
		// 		id: '1.1',
		// 		label: 'Blocks',
		// 		link: '/blocks'
		// 	},
		// 	{
		// 		id: '1.2',
		// 		label: 'Uncle',
		// 		link: '/uncle'
		// 	},
		// 	{
		// 		id: '1.3',
		// 		label: 'Forked Blocks (Reorgs)',
		// 		link: '/reorgs'
		// 	}
		// ]
	},
	{
		id: '2',
		label: 'Transactions',
		link: '/tx'
		// submenus: [
		// 	{
		// 		id: '2.1',
		// 		label: 'Validated',
		// 		link: '/tx'
		// 	},
		// 	{
		// 		id: '2.2',
		// 		label: 'Pending',
		// 		link: '/pending'
		// 	}
		// ]
	},
	{
		id: '3',
		label: 'Tokens',
		submenus: [
			{
				id: '3.1',
				label: 'All',
				link: '/tokens'
			},
			{
				id: '3.2',
				label: 'Astra',
				link: '/accounts'
			}
		]
	},
	// {
	// 	id: '4',
	// 	label: 'APIs',
	// 	submenus: [
	// 		{
	// 			id: '4.1',
	// 			label: 'GraphQL',
	// 			link: '/graphql'
	// 		},
	// 		{
	// 			id: '4.2',
	// 			label: 'RPC',
	// 			link: '/astra'
	// 		},
	// 		{
	// 			id: '4.3',
	// 			label: 'Eth RPC',
	// 			link: '/eth-rpc'
	// 		}
	// 	]
	// },
	{
		id: '5',
		label: 'Astra Mainnet',
		prefixIcon: <LiveIcon />,
		link: '/'
		// submenus: [
		// 	{
		// 		id: '5.1',
		// 		label: 'GraphQL',
		// 		link: '/graphql'
		// 	},
		// 	{
		// 		id: '5.2',
		// 		label: 'RPC',
		// 		link: '/astra'
		// 	}
		// ]
	}
	// {
	// 	id: '6',
	// 	type: 'locale',
	// 	submenus: [
	// 		{
	// 			id: '6.1',
	// 			label: 'ENG',
	// 			link: '/en'
	// 		},
	// 		{
	// 			id: '6.2',
	// 			label: 'VI',
	// 			link: '/vi'
	// 		}
	// 	]
	// }
	// {
	// 	id: '7',
	// 	label: 'Single Menu',
	// 	link: '/accounts'
	// }
]

export default function Navbar() {
	const [shadow, setShadow] = useState(false)
	const [showHamburgerMenu, setShowHamburgerMenu] = useState(false)
	const [load, setLoad] = useState(false)

	const _searchWrapperRef = useRef<HTMLDivElement>(null)

	const _hideMenu = () => {
		setLoad(false)
		//time for animation
		setTimeout(() => setShowHamburgerMenu(false), 500)
	}

	useOutsideElement(_searchWrapperRef, _hideMenu)

	useEffect(() => {
		function scroll() {}
		window.addEventListener('scroll', _ => {
			const pos = document.body.scrollTop || document.documentElement.scrollTop
			if (pos > 0) {
				setShadow(true)
			} else {
				setShadow(false)
			}
		})
		return () => {
			window.removeEventListener('scroll', scroll)
		}
	}, [shadow])

	useEffect(() => {
		setTimeout(() => setLoad(showHamburgerMenu), 100)
	}, [showHamburgerMenu])

	return (
		<>
			<ModalWrapper open={showHamburgerMenu}>
				<div
					className={clsx(styles.hamburgerMenuContainer, 'padding-lg hamburger-enter', {
						'hamburger-enter-active': load
					})}
					ref={_searchWrapperRef}
				>
					<div className={styles.close}>
						<span onClick={_hideMenu} className="icon-close contrast-color-100 pointer"></span>
					</div>
					<div className={styles.content}>
						<MoibleNavigation items={items} />
					</div>
				</div>
			</ModalWrapper>
			<nav
				className={clsx(styles.navbar, 'margin-bottom-sm', {
					'shadow-xs': shadow,
					[styles.navbarScroll]: shadow
				})}
			>
				<div className={clsx(styles.container, 'margin-auto')}>
					<div className={styles.hamburgerMenuIcon}>
						<div className="padding-left-lg pointer">
							<Image
								onClick={() => setShowHamburgerMenu(true)}
								alt="Astra Explorer"
								src={'/images/icons/hamburger_icon.svg'}
								layout="fill"
							/>
						</div>
					</div>
					<div className={styles.left}>
						<Logo type="transparent" />
					</div>
					<div className={styles.right}>
						<Navigation items={items} />
						<SwitchTheme />
					</div>
				</div>
			</nav>
		</>
	)
}
