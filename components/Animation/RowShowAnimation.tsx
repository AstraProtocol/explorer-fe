import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

/**
 * @param action true: exec animation
 * @param minHeight hold element space
 */
type RowShowAnimationProps = {
	children: React.ReactNode
	action: boolean
}
export default function RowShowAnimation({ children, action }: RowShowAnimationProps) {
	const [show, setShow] = useState(false)
	useEffect(() => {
		if (action) {
			setTimeout(() => {
				setShow(true)
			}, 100)
		}
	}, [action])
	return (
		<>
			{action ? (
				<CSSTransition
					in={show}
					timeout={5000}
					classNames="alert"
					// nodeRef={childrenRef}
					unmountOnExit
					// onEnter={() => setShowButton(false)}
					// onExited={() => setShowButton(true)}
				>
					{children}
				</CSSTransition>
			) : (
				children
			)}
		</>
	)
}
