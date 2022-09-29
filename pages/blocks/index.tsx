import { Breadcumbs } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import RowLoader from 'components/Loader/RowLoader'
import Search from 'components/Search'
import RowTitle from 'components/Typography/RowTitle'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import BlockRow from 'view/Block/BlockRow'
import useBlock from 'view/Block/hook/useBlock'
import Layout from '../../components/Layout'

const BlockDetailPage: React.FC<NextPage> = _ => {
	const { fullPageData, getPropserAddress } = useBlock()
	return (
		<Layout>
			<Head>
				<title>Block</title>
			</Head>
			<Search />
			<Container>
				<Breadcumbs items={[{ label: 'Blocks' }]} />
				<RowTitle
					columns={[
						{ title: 'Block ID', col: 'padding-left-lg col-2 gutter-right' },
						{ title: 'Block Proposer', col: 'padding-left-xl gutter-left col-6' },
						{ title: 'Time', col: 'padding-left-sm col-2' },
						{ title: 'Total Transaction', col: 'padding-left-sm' }
					]}
				/>
				<div>
					{!fullPageData || fullPageData.length === 0 ? (
						<RowLoader row={12} />
					) : (
						<div>
							{fullPageData?.map(item => (
								<BlockRow
									key={item.blockHeight}
									blockNumber={item.blockHeight}
									proposerAddress={getPropserAddress(item.committedCouncilNodes)?.address}
									transactions={item.transactionCount}
									updatedAt={item.blockTime}
									size={0}
									value={0}
									newBlock={item.newBlock}
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
