import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './style.module.scss'

export type CollapseItem = {
	element: React.ReactNode
	link?: string
}

export type CollapseProps = {
	open?: boolean
	title?: React.ReactNode
	items: CollapseItem[]
	classes?: {
		wrapper?: string
		header?: string
		item?: string
		wappterItem?: string
	}
}
export default function Collapse({ title, items, classes, open }: CollapseProps) {
	const [_open, _setOpen] = useState(false)

	useEffect(() => {
		_setOpen(open)
	}, [open])

	return (
		<div className={clsx(styles.collapse, classes?.wrapper)}>
			{!!title && (
				<div
					className={clsx(styles.header, classes?.header, 'padding-sm', 'pointer', 'text text-bold')}
					onClick={() => _setOpen(!_open)}
				>
					<span className="padding-right-md text-lg">{title}</span>
					<span
						className={clsx('text-xl', {
							'icon-arrow-right': !_open,
							'icon-arrow-down': _open
						})}
					></span>
				</div>
			)}
			<div
				className={clsx(styles.content, classes?.wappterItem, {
					[styles.show]: _open
				})}
			>
				{items.map((item, index) => (
					<div className={clsx(classes?.item)} key={`${item.link}-${index}`}>
						{!!item.link ? (
							<Link href={item.link}>
								<a className="link pointer text-base padding-md">{item.element}</a>
							</Link>
						) : (
							item.element
						)}
					</div>
				))}
			</div>
		</div>
	)
}
