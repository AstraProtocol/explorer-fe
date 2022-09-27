import { Breadcumbs } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import Search from 'components/Search'
import { NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'

const BlockDetailPage: React.FC<NextPage> = _ => {
	return (
		<Layout>
			<Search />
			<Container>
				<Breadcumbs items={[{ label: 'Blocks' }]} />
			</Container>
		</Layout>
	)
}

export default BlockDetailPage
