import { Table } from '@astraprotocol/astra-ui'
import { Column, RowData } from '@astraprotocol/astra-ui/lib/es/components/Table/Table'
import clsx from 'clsx'
import Tabs from 'components/Tabs/Tabs'
import { isString } from 'lodash'
import styles from '../style.module.scss'

type CardContentTabsProps = {
	titles: string[]
	content: Array<string | { cols: Column[]; rows: RowData[] }>
}

export default function CardContentTabs({ titles, content }: CardContentTabsProps) {
	const _title = titles.map(title => ({ title: title, id: title, padding: ' ' }))
	const _content = {}
	content.map((content, idx) => {
		if (isString(content)) {
			_content[titles[idx]] = (
				<span
					className={clsx(styles.rawInput, 'text text-sm contrast-color-70 padding-sm word-break-all')}
					style={{ display: 'block' }}
				>
					{content}
				</span>
			)
		} else {
			_content[titles[idx]] = <Table id="param" colums={content.cols} rows={content.rows} />
		}
	})
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
