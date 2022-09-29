import { useState } from 'react'
import Row from '../Grid/Row'
import styles from './style.module.scss'
import Tab from './Tab'

interface Tab {
	value: string
	title: string
}

interface Content {
	[key: string]: JSX.Element
}

interface Props {
	tabs?: Tab[]
	contents?: Content
}

const Tabs = ({ tabs, contents }: Props) => {
	const [currentActiveValue, setActiveValue] = useState(tabs[0].value)
	return (
		<>
			<Row className={styles.tabs}>
				{tabs.map((tab: Tab) => (
					<Tab
						onClick={() => setActiveValue(tab.value)}
						active={currentActiveValue == tab.value}
						title={tab.title}
						key={tab.value}
					></Tab>
				))}
			</Row>
			{contents[currentActiveValue]}
		</>
	)
}

export default Tabs
