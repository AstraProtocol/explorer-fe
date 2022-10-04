import { astraToEth } from '@astradefi/address-converter'
import { Breadcumbs } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import RowLoader from 'components/Loader/RowLoader'
import Search from 'components/Search'
import RowTitle from 'components/Typography/RowTitle'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { getStakingValidatorByHex } from 'utils/address'
import BlockRow from 'views/block/BlockRow'
import useBlock from 'views/block/hook/useBlock'
import Layout from '../../components/Layout'

const BlockDetailPage: React.FC<NextPage> = _ => {
	const { fullPageData, getPropserAddress } = useBlock()
	return (
		<Layout>
			<Head>
				<title>Block | {process.env.NEXT_PUBLIC_TITLE}</title>
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
							{fullPageData?.map(item => {
								const proposerHash = getPropserAddress(item.committedCouncilNodes)?.address
								const proposer = getStakingValidatorByHex(proposerHash) as Proposer
								return (
									<BlockRow
										key={item.blockHeight}
										blockNumber={item.blockHeight}
										proposerAddress={astraToEth(proposer.initialDelegatorAddress)}
										transactions={item.transactionCount}
										updatedAt={item.blockTime}
										size={0}
										value={0}
										newBlock={item.newBlock}
									/>
								)
							})}
						</div>
					)}
				</div>
			</Container>
		</Layout>
	)
}

export default BlockDetailPage
