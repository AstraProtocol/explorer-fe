import { Breadcumbs } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import RowLoader from 'components/Loader/RowLoader'
import Search from 'components/Search'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import BlockRow from 'view/Block/BlockRow'
import useBlock from 'view/Block/hook/useBlock'
import Layout from '../../components/Layout'

const BlockDetailPage: React.FC<NextPage> = _ => {
	const { fullPageData } = useBlock()
	return (
		<Layout>
			<Head>
				<title>Block</title>
			</Head>
			<Search />
			<Container>
				<Breadcumbs items={[{ label: 'Blocks' }]} />
				<div>
					{!fullPageData || fullPageData.length === 0 ? (
						<RowLoader row={12} />
					) : (
						<div>
							{fullPageData?.map(item => (
								<BlockRow
									key={item.number}
									blockNumber={item.number}
									proposerAddress={item.miner_hash}
									transactions={0}
									updatedAt={item.timestamp}
									size={item.size}
									value={0}
								/>
							))}
						</div>
					)}
				</div>
			</Container>
		</Layout>
	)
}

export default BlockDetailPage
