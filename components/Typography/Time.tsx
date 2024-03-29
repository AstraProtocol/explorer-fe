import clsx from 'clsx'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { dateFormat } from 'utils/helper'
dayjs.extend(utc)
dayjs.extend(timezone)
interface TimeProps {
	time: string | number
	confirmedWithin?: string
	color?: string
}

export const Time = ({ time, color, confirmedWithin }: TimeProps) => {
	return (
		<span className={clsx('money money-sm', color || 'contrast-color-70')}>
			<span className="money-sm">{dayjs(time).utcOffset('+0700').format('HH:mm:ss (+7 UTC)')}</span>
			<span className={clsx('separate', 'margin-left-xs padding-left-xs margin-top-md')}></span>
			<span className="money-sm">{dayjs(time).utcOffset('+0700').format(dateFormat())}</span>
			{confirmedWithin && (
				<>
					<span className={clsx('separate', 'margin-left-xs padding-left-xs margin-top-md')}></span>
					<span className="money-sm">Confirmed within {confirmedWithin}</span>
				</>
			)}
			<style jsx>{`
				.separate {
					border-left: 1.4px solid rgba(255, 255, 255, 0.1);
				}
			`}</style>
		</span>
	)
}
