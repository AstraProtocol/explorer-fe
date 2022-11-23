import { Breadcumbs, useMobileLayout } from '@astraprotocol/astra-ui'
import * as Sentry from '@sentry/nextjs'
import { evmApi } from 'api'
import API_LIST from 'api/api_list'
import { AxiosError } from 'axios'
import Container from 'components/Container'
import Head from 'next/head'
import React from 'react'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import AddressDetailTabs from 'views/accounts/AddressDetailTabs'
import AddressOverview from 'views/accounts/AddressOverview'
import web3 from 'web3'
import Layout from '../../components/Layout'

type Props = {
	errorMessage?: string
	address: string
	addressData: Address
}

const AddressDetailPage: React.FC<Props> = props => {
	const { isMobile } = useMobileLayout()
	const { address, addressData, errorMessage } = props

	const isContract = addressData?.type === 'contractaddress'
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
				{addressData ? (
					<>
						<AddressOverview address={address} addressData={addressData} />
						<AddressDetailTabs address={address} addressData={addressData} />
					</>
				) : (
					<h1 className="text contrast-color-70 margin-top-sm">{errorMessage || 'Address Not Found'}</h1>
				)}
			</Container>
		</Layout>
	)
}

export async function getServerSideProps({ params }) {
	const { address } = params
	let addressData
	if (web3.utils.isAddress(address))
		try {
			const addressRes = await evmApi.get<BlockDetailResponse>(`${API_LIST.ADDRESS_DETAIL}${address}`)
			addressData = addressRes.data.result
			if (!addressData) {
				return {
					props: {
						errorMessage: '404 Not Found',
						address,
						addressData: null
					}
				}
			}
			return {
				props: {
					address,
					addressData
				}
			}
		} catch (e) {
			// console.log(e.message)
			Sentry.captureException(e)
			let errorMessage = e.message
			if (e instanceof AxiosError) {
				console.log('error api', e.message, e.code, e?.config?.baseURL, e?.config?.url)
				if (e.code !== '200') errorMessage = '404 Not Found'
			}
			return {
				props: {
					errorMessage,
					address,
					addressData: null
				}
			}
		}

	return {
		props: {
			errorMessage: 'Address invalid',
			address,
			addressData: null
		}
	}
}

export default AddressDetailPage
