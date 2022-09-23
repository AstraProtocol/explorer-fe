import React, { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { fetcher } from '../api'
import { selectTheme } from '../slices/themeSlice'
import { useAppSelector } from '../store/hooks'
import Footer from './Footer'
import Navbar from './Navbar'

type Props = {
	children: ReactNode
}

const Layout: React.FC<Props> = props => {
	const theme = useAppSelector(selectTheme)

	return (
		<SWRConfig
			value={{
				fetcher: fetcher
			}}
		>
			<div className={theme} style={{ minHeight: '100vh' }}>
				<Navbar />
				<div className="layout">{props.children}</div>
				<Footer />
			</div>
		</SWRConfig>
	)
}

export default Layout
