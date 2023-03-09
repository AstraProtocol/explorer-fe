import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

type TimerProps = {
	interval?: number
	updatedAt: string | number
}

export default function Timer({ interval = 1000, updatedAt }: TimerProps) {
	const [count, setCount] = useState(0)
	useEffect(() => {
		if (interval > 0) {
			const intervel = setInterval(function () {
				setCount(prevCount => prevCount + 1)
			}, interval)
			return () => clearInterval(intervel)
		}
	}, [interval])

	const _renderText = () => {
		const years = Number(dayjs().diff(dayjs(updatedAt), 'years'))
		if (years > 0) {
			// _disabledInterval()
			return `${years} year${years > 1 ? 's' : ''} ago`
		}
		const months = Number(dayjs().diff(dayjs(updatedAt), 'months'))
		if (months > 0) {
			// _disabledInterval()
			return `${months} month${months > 1 ? 's' : ''} ago`
		}
		const weeks = Number(dayjs().diff(dayjs(updatedAt), 'weeks'))

		if (weeks > 0) {
			// _disabledInterval()
			return `${weeks} week${weeks > 1 ? 's' : ''} ago`
		}
		const days = Number(dayjs().diff(dayjs(updatedAt), 'days'))

		if (days > 0) {
			// _disabledInterval()
			return `${days} day${days > 1 ? 's' : ''} ago`
		}
		const hours = Number(dayjs().diff(dayjs(updatedAt), 'hours'))

		if (hours > 0) {
			// _disabledInterval()
			return `${hours} hour${hours > 1 ? 's' : ''} ago`
		}

		const minutes = Number(dayjs().diff(dayjs(updatedAt), 'minutes'))

		if (minutes > 0) {
			return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
		}
		const seconds = Number(dayjs().diff(dayjs(updatedAt), 'seconds'))

		if (seconds > 0) {
			return `${seconds} second${seconds > 1 ? 's' : ''} ago`
		}
	}
	return (
		<span className="contrast-color-50 text text-xs" key={count}>
			{_renderText()}
		</span>
	)
}
