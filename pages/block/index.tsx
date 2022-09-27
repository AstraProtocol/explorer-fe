import { Breadcumbs } from '@astraprotocol/astra-ui/es/components/Breadcumbs'
import Container from 'components/Container'
import { NextPage } from 'next'
import React from 'react'
import Layout from '../../components/Layout'

const BlockDetailPage: React.FC<NextPage> = _ => {
	return (
		<Layout>
			<Breadcumbs items={[{ label: 'Blocks' }]} />
			<Container>a</Container>
		</Layout>
	)
}

export default BlockDetailPage
