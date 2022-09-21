import styles from './style.module.scss'
import Logo from '../Logo'
import Navigation, { MenuItem } from './Navigation'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

const items: MenuItem[] = [
	{
		id: '1',
		label: 'Text 1',
		submenus: [
			{
				id: '1.1',
				label: 'Text1.1111 1111111',
				submenus: [
					{ id: '1.1.1', label: 'AA', link: 'aaa' },
					{ id: '1.1.2', label: 'BB', link: 'aa' }
				]
			}
		]
	},
	{
		id: '2',
		label: 'Text 2',
		submenus: [
			{
				id: '2.1',
				label: 'Text2.1',
				link: '#'
			},
			{
				id: '2.2',
				label: 'Text2.2',
				submenus: [
					{ id: '2.2.1', label: 'AAa', link: 'aaa' },
					{ id: '2.2.2', label: 'Bb', link: 'aa' }
				]
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
					<Logo />
				</div>
				<div className={styles.right}>
					<Navigation items={items} />
				</div>
			</div>
		</nav>
	)
}
