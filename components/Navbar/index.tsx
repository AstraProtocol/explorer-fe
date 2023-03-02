import { ModalWrapper, useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Search from 'components/Search'

import useOutsideElement from 'hooks/useOutsideElement'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Logo from '../Logo'
import LiveIcon from './LiveIcon'
import MoibleNavigation from './MobileNavigation'
import Navigation, { MenuItem } from './Navigation'
import styles from './style.module.scss'
import SwitchTheme from './SwitchTheme'

export default function Navbar() {
	const { isMobile } = useMobileLayout('small')
	const { isMobile: isResponsive } = useMobileLayout('large')
	const [shadow, setShadow] = useState(false)
	const [showHamburgerMenu, setShowHamburgerMenu] = useState(false)
	const [load, setLoad] = useState(false)

	const _searchWrapperRef = useRef<HTMLDivElement>(null)

	const items: MenuItem[] = [
		{
			id: '1',
			label: 'Blocks',
			link: '/block'
		},
		{
			id: '2',
			label: 'Transactions',
			link: '/tx'
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
		{
			id: '4',
			label: 'Stats',
			link: '/charts'
		},
		{
			id: '5',
			label: process.env.NEXT_PUBLIC_ENV == 'mainnet' ? 'Astra Mainnet' : 'Astra Testnet',
			prefixIcon: <LiveIcon />,
			link: '/'
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
	]

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
						{isMobile && <Search full={false} />}
					</div>
					{isResponsive && !isMobile && <Search full={false} />}
					<div className={styles.right}>
						<Navigation items={items} />
						<Search full={false} />
						<SwitchTheme />
					</div>
				</div>
			</nav>
		</>
	)
}
