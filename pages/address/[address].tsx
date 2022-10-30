import { Breadcumbs, useMobileLayout } from '@astraprotocol/astra-ui'
import { evmApi } from 'api'
import API_LIST from 'api/api_list'
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
	addressData: Address
}

const AddressDetailPage: React.FC<Props> = props => {
	const { isMobile } = useMobileLayout()
	const { address, addressData } = props

	const isContract = addressData.type === 'contractaddress'
	const title = isContract
		? `Contract ${address} | ${process.env.NEXT_PUBLIC_TITLE}`
		: `Address ${address} | ${process.env.NEXT_PUBLIC_TITLE}`
	return (
		<Layout>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<title>{title}</title>
			</Head>
			<Container>
				<Breadcumbs
					items={[
						{ label: 'Address', link: LinkMaker.address() },
						{ label: isMobile ? ellipseBetweenText(address) : address }
					]}
				/>
				<AddressOverview address={address} addressData={addressData} />
				<AddressDetailTabs address={address} addressData={addressData} />
			</Container>
		</Layout>
	)
}

export async function getServerSideProps({ params }) {
	const { address } = params
	if (web3.utils.isAddress(address))
		try {
			const addressRes = await evmApi.get<BlockDetailResponse>(`${API_LIST.ADDRESS_DETAIL}${address}`)
			const addressData = addressRes.data.result
			return {
				props: {
					address,
					addressData
				}
			}
		} catch (e) {
			// console.log(e.message)
			return {
				redirect: {
					destination: '/404',
					permanent: false
				}
			}
		}

	return {
		redirect: {
			destination: '/404',
			permanent: false
		}
	}
}

export default AddressDetailPage
