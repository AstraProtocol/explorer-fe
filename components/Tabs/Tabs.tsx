import clsx from 'clsx'
import { useState } from 'react'
import Row from '../Grid/Row'
import styles from './style.module.scss'
import Tab from './Tab'

interface Tab {
	id: string
	title: string
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
	tabChange?: (tabIndex: string) => void
}

const Tabs = ({ tabs, contents, classes, headerBorder = true, headerPadding, tabChange }: Props) => {
	const [tabId, setTabId] = useState(tabs[0].id)
	const _changeTab = value => {
		setTabId(value)
		if (tabChange) {
			tabChange(value)
		}
	}
	return (
		<>
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
					></Tab>
				))}
			</Row>
			<div className={classes || 'margin-top-xl padding-bottom-lg'}>{contents[tabId]}</div>
		</>
	)
}

export default Tabs
