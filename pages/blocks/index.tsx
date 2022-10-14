import { astraToEth } from '@astradefi/address-converter'
import { Breadcumbs, Pagination, useMobileLayout } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import RowLoader from 'components/Loader/RowLoader'
import Search from 'components/Search'
import RowTitle from 'components/Typography/RowTitle'
import { isEmpty } from 'lodash'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { getStakingValidatorByHex } from 'utils/address'
import BlockRow from 'views/block/BlockRow'
import useBlock from 'views/block/hook/useBlock'
import Layout from '../../components/Layout'

const BlockDetailPage: React.FC<NextPage> = _ => {
	const [loaderTime, setLoaderTime] = useState(false)
	const { fullPageData, getPropserAddress, pagination, changePage } = useBlock()
	const { isMobile } = useMobileLayout()
	//loader display at least 1 second
	useEffect(() => {
		if (isEmpty(fullPageData)) {
			setLoaderTime(true) // time for loader dispaly
			setTimeout(() => {
				setLoaderTime(false) // endtime
			}, 500)
		}
	}, [fullPageData])
	return (
		<Layout>
			<Head>
				<title>Block | {process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>
			<Search />
			<Container>
				<div
					className="flex sm-flex-column sm-margin-bottom-lg flex-align-center sm-flex-align-start"
					style={{ justifyContent: 'space-between' }}
				>
					<div className="sm-margin-bottom-lg">
						<Breadcumbs items={[{ label: 'Blocks' }]} size="3xl" />
					</div>
					<div>
						<Pagination
							total={pagination.total}
							currentPage={pagination.page}
							disabled={false}
							onChange={changePage}
						/>
					</div>
				</div>
				{!isMobile && (
					<RowTitle
						columns={[
							{ title: 'Block ID', col: 'padding-left-lg col-2 gutter-right' },
							{ title: 'Block Proposer', col: 'padding-left-xl gutter-left col-6' },
							{ title: 'Time', col: 'padding-left-sm col-2' },
							{ title: 'Total Transaction', col: 'padding-left-sm' }
						]}
					/>
				)}
				<div style={{ overflow: 'hidden' }}>
					{loaderTime ? (
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
				<div style={{ justifyContent: 'space-between', display: 'flex' }}>
					<div></div>
					<div>
						<Pagination
							total={pagination.total}
							currentPage={pagination.page}
							disabled={false}
							onChange={changePage}
						/>
					</div>
				</div>
			</Container>
		</Layout>
	)
}

export default BlockDetailPage
