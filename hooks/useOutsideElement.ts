import { useEffect } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideElement(ref, clickOut: Function) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				// alert('You clicked outside of me!')O
				clickOut()
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref])
}
