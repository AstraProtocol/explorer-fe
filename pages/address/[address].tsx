import { Breadcumbs } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import Head from 'next/head'
import React from 'react'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import AddressDetailTabs from 'views/accounts/AddressDetailTabs'
import AddressOverview from 'views/accounts/AddressOverview'
import web3 from 'web3'
import Layout from '../../components/Layout'

type Props = {
	address: string
}

const AddressDetailPage: React.FC<Props> = props => {
	const { address } = props

	return (
		<Layout>
			<Head>
				<title>
					Address {address} - {process.env.NEXT_PUBLIC_TITLE}
				</title>
			</Head>
			<Container>
				<Breadcumbs
					items={[{ label: 'Address', link: LinkMaker.address() }, { label: ellipseBetweenText(address) }]}
				/>
				<AddressOverview address={address} />
				<AddressDetailTabs address={address} />
			</Container>
		</Layout>
	)
}

export async function getServerSideProps({ params }) {
	const { address } = params
	if (web3.utils.isAddress(address))
		return {
			props: {
				address
			}
		}
	// try {
	// 	const blockRes = await cosmosApi.get<BlockDetailResponse>(`${API_LIST.BLOCKS}${blockHeight}`)
	// 	const transactionRes = await cosmosApi.get<TransactionResponse>(
	// 		`${API_LIST.TRANSACTION_OF_BLOCK.replace(':id', blockHeight)}`
	// 	)
	// 	const transactions = transactionRes.data.result
	// 	if (blockRes.status === 200) {
	// 		return { props: { blockDetail: blockRes.data.result, blockHeight, transactions } }
	// 	} else {
	// 		return { props: { data: {} } }
	// 	}
	// } catch (e) {
	// 	return {
	// 		redirect: {
	// 			destination: '/404',
	// 			permanent: false
	// 		}
	// 	}
	// }
	return {
		redirect: {
			destination: '/404',
			permanent: false
		}
	}
}

export default AddressDetailPage
