import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

/**
 * @param action true: exec animation
 * @param minHeight hold element space
 */
type RowShowAnimationProps = {
	children: React.ReactNode
	action: boolean
	minHeight?: string
}
export default function RowShowAnimation({ children, action, minHeight = 'unset' }: RowShowAnimationProps) {
	const [show, setShow] = useState(false)
	useEffect(() => {
		if (action) {
			setTimeout(() => {
				setShow(true)
			}, 100)
		}
	}, [])
	return (
		<>
			{action ? (
				<div style={{ minHeight: minHeight }}>
					<CSSTransition
						in={show}
						timeout={300}
						classNames="alert"
						// nodeRef={childrenRef}
						unmountOnExit
						// onEnter={() => setShowButton(false)}
						// onExited={() => setShowButton(true)}
					>
						{children}
					</CSSTransition>
				</div>
			) : (
				children
			)}
		</>
	)
}
