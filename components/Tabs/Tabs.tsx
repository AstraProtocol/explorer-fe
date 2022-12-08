import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Row from '../Grid/Row'
import styles from './style.module.scss'
import Tab from './Tab'

interface Tab {
	id: string
	title: string | React.ReactNode
	padding?: string
}

interface Content {
	[key: string]: JSX.Element
}

interface Props {
	tabs?: Tab[]
	contents?: Content
	classes?: string
	headerBorder?: boolean
	headerPadding?: string
	defaultTab?: string
	tabChange?: (tabIndex: string) => void
}

const Tabs = ({ tabs, contents, classes, headerBorder = true, headerPadding, defaultTab, tabChange }: Props) => {
	const [tabId, setTabId] = useState(defaultTab || tabs[0].id)

	const _changeTab = value => {
		setTabId(value)
		if (tabChange) {
			tabChange(value)
		}
	}

	useEffect(() => {
		if (defaultTab) setTabId(defaultTab)
	}, [defaultTab])

	return (
		<div style={{ overflowX: 'auto' }}>
			<Row
				classes={clsx(styles.tabs, headerPadding || 'padding-left-xl padding-right-xl', {
					'border border-bottom-base': headerBorder
				})}
			>
				{tabs.map((tab: Tab) => (
					<Tab
						onClick={() => _changeTab(tab.id)}
						active={tabId == tab.id}
						title={tab.title}
						key={tab.id}
						padding={tab.padding}
					/>
				))}
			</Row>
			<div className={classes || 'margin-top-xl padding-bottom-lg'}>{contents[tabId]}</div>
		</div>
	)
}

export default Tabs
