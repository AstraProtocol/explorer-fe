import styles from './style.module.scss'
import Logo from '../Logo'
import Navigation, { MenuItem } from './Navigation'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import LiveIcon from './LiveIcon'

const items: MenuItem[] = [
	{
		id: '1',
		label: 'Blocks',
		submenus: [
			{
				id: '1.1',
				label: 'Blocks',
				link: '/blocks'
			},
			{
				id: '1.2',
				label: 'Uncle',
				link: '/blocks'
			},
			{
				id: '1.3',
				label: 'Forked Blocks (Reorgs)',
				link: '/reorgs'
			}
		]
	},
	{
		id: '2',
		label: 'Transactions',
		submenus: [
			{
				id: '2.1',
				label: 'Validated',
				link: '/validated'
			},
			{
				id: '2.2',
				label: 'Pending',
				link: '/pending'
			}
		]
	},
	{
		id: '3',
		label: 'Tokens',
		submenus: [
			{
				id: '3.1',
				label: 'All',
				link: '/all'
			},
			{
				id: '3.2',
				label: 'Astra',
				link: '/astra'
			}
		]
	},
	{
		id: '4',
		label: 'APIs',
		submenus: [
			{
				id: '4.1',
				label: 'GraphQL',
				link: '/graphql'
			},
			{
				id: '4.2',
				label: 'RPC',
				link: '/astra'
			},
			{
				id: '4.3',
				label: 'Eth RPC',
				link: '/eth-rpc'
			}
		]
	},
	{
		id: '5',
		label: 'Astra main',
		background: true,
		prefixIcon: <LiveIcon />,
		submenus: [
			{
				id: '5.1',
				label: 'GraphQL',
				link: '/graphql'
			},
			{
				id: '5.2',
				label: 'RPC',
				link: '/astra'
			}
		]
	},
	{
		id: '6',
		type: 'locale',
		submenus: [
			{
				id: '6.1',
				label: 'ENG',
				link: '/en'
			},
			{
				id: '6.2',
				label: 'VI',
				link: '/vi'
			}
		]
	}
]

export default function Navbar() {
	const [shadow, setShadow] = useState(false)
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

	return (
		<nav className={clsx(styles.navbar, { 'shadow-xs': shadow })}>
			<div className={clsx(styles.container, 'margin-auto')}>
				<div className={styles.left}>
					<Logo type='transparent' />
				</div>
				<div className={styles.right}>
					<Navigation items={items} />
				</div>
			</div>
		</nav>
	)
}
