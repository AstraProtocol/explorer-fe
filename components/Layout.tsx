import React, { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { fetcher } from '../api'
import Footer from './Footer'
import Navbar from './Navbar'

type Props = {
	children: ReactNode
}

const Layout: React.FC<Props> = props => (
	<SWRConfig
		value={{
			fetcher: fetcher
		}}
	>
		<div className="dark--mode" style={{ minHeight: '100vh' }}>
			<Navbar />
			<div className="layout">{props.children}</div>
			<Footer />
		</div>
	</SWRConfig>
)

export default Layout
