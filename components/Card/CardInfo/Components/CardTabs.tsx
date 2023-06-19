import { Card, Table, useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Tabs from 'components/Tabs/Tabs'
import { isObject, isString } from 'lodash'
import styles from '../style.module.scss'

type CardTabsProps = {
	tabTitles: string[]
	tabContent: any[]
}

export default function CardTabs({ tabTitles, tabContent }: CardTabsProps) {
	const { isMobile } = useMobileLayout()
	const _title = tabTitles
		? tabTitles.map(title => ({ title: title, id: title, padding: ' ' }))
		: [{ title: '', id: '', padding: ' ' }]
	const _content = {}
	// console.log({ tabContent, tabTitles })

	const _renderTable = (titles: string[], rowData: string[][]) => {
		const titleEl = titles.map(t => ({
			key: t,
			content: <span className="text-md contrast-color-70">{t}</span>,
			render: val => <span className="contrast-color-70 text-sm">{val}</span>
		}))
		const rows = []
		for (let row of rowData) {
			const rowData = {}
			for (let i = 0; i < row.length; i++) {
				rowData[titles[i]] = { content: row[i] }
			}
			rows.push(rowData)
		}

		return <Table classes={{ table: styles.tableTD }} id="param" colums={titleEl} rows={rows} />
	}

	tabContent &&
		tabContent.forEach((content, idx) => {
			if (isString(content)) {
				// only string
				_content[tabTitles[idx]] = (
					<span
						className={clsx(styles.rawInput, 'text text-sm contrast-color-70 padding-sm word-break-all')}
						style={{ display: 'block' }}
					>
						{content}
					</span>
				)
			} else if (isObject(content) && content['tableTitles']) {
				// table
				_content[tabTitles[idx]] = _renderTable(content['tableTitles'], content['tableContents'])
			} else if (isObject(content) && content['tabTitles']) {
				// table
				_content[tabTitles[idx]] = (
					<CardTabs tabTitles={content['tabTitles']} tabContent={content['tabContent']} />
				)
			} else {
				// row
				const keys = Object.keys(content)
				const rows: JSX.Element[] = []
				for (let key of keys) {
					if (isString(content[key])) {
						rows.push(
							<Card.Row
								left={{ content: key, wapperClasses: styles.left }}
								right={{ content: content[key], align: 'left' }}
							/>
						)
					} else if (isObject(content[key]) && content[key]['tableTitles']) {
						// table
						rows.push(
							<Card.Row
								left={{ content: key, wapperClasses: styles.left }}
								right={{
									content: _renderTable(content[key]['tableTitles'], content[key]['tableContents']),
									align: 'left'
								}}
							/>
						)
					} else if (isObject(content[key]) && content[key]['tabTitles']) {
						// table
						rows.push(
							<Card.Row
								left={{ content: key, wapperClasses: styles.left }}
								right={{
									content: (
										<CardTabs
											tabTitles={content[key]['tabTitles']}
											tabContent={content[key]['tabContent']}
										/>
									),
									align: 'left'
								}}
							/>
						)
					}
				}
				_content[tabTitles[idx]] = (
					<span
						className={clsx(styles.rawInput, 'text text-sm contrast-color-70 padding-sm word-break-all')}
						style={{ display: 'block', minWidth: isMobile ? 300 : 500 }}
					>
						{rows}
					</span>
				)
			}
		})
	return (
		<div>
			<div style={{ maxWidth: '10000px' }}>
				<Tabs
					tabs={_title}
					contents={_content}
					classes="padding-top-xs"
					headerBorder={false}
					headerPadding="padding-left-sm flex-wrap"
				/>
			</div>
		</div>
	)
}
