import clsx from 'clsx'
import Tabs from 'components/Tabs/Tabs'
import styles from '../style.module.scss'

type CardContentTabsProps = {
	titles: string[]
	content: string[]
}

export default function CardContentTabs({ titles, content }: CardContentTabsProps) {
	const _title = titles.map(title => ({ title: title, id: title, padding: ' ' }))
	const _content = {}
	content.map(
		(content, idx) =>
			(_content[titles[idx]] = (
				<span
					className={clsx(styles.rawInput, 'text text-sm contrast-color-70 padding-sm word-break-all')}
					style={{ display: 'block' }}
				>
					{content}
				</span>
			))
	)
	return (
		<div style={{ maxWidth: '885px', maxHeight: '200px', overflowY: 'auto' }}>
			<Tabs
				tabs={_title}
				contents={_content}
				classes="padding-top-xs"
				headerBorder={false}
				headerPadding="padding-left-sm"
			/>
		</div>
	)
}
