import { useEffect, useState } from 'react'

/**
 *
 * @param done
 * @param timeout
 * @returns
 */
export default function useDelayUntilDone(done: () => boolean, timeout = 5000) {
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
	const [isWaiting, setIsWaiting] = useState(true)

	useEffect(() => {
		if (isWaiting && !done() && !timeoutId) {
			setTimeoutId(setTimeout(() => setIsWaiting(false), timeout))
		}
		if (done() && isWaiting) {
			clearTimeout(timeoutId)
			setIsWaiting(false)
			setTimeoutId(undefined)
		}
	}, [done, timeoutId, isWaiting])

	return {
		isWaiting
	}
}
