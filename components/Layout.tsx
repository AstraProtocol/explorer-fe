import React, { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

type Props = {
	children: ReactNode
}

const Layout: React.FC<Props> = props => (
	<div className="dark--mode" style={{ minHeight: '100vh' }}>
		<Navbar />
		<div className="layout">{props.children}</div>
		<Footer />
	</div>
)

export default Layout
