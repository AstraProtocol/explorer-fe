import { astraToEth } from '@astradefi/address-converter'
import { Breadcumbs, useMobileLayout } from '@astraprotocol/astra-ui'
import * as Sentry from '@sentry/react'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { AxiosError } from 'axios'
import Container from 'components/Container'
import React from 'react'
import { getValidatorSummary } from 'slices/commonSlice'
import { useAppSelector } from 'store/hooks'
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

	const validatorSummary = useAppSelector(getValidatorSummary)

	const isMainnet = window?.location?.hostname?.includes('.astranaut.io')
	const validator = validatorSummary.find(
		(v: ValidatorData) => astraToEth(v.initialDelegatorAddress).toLowerCase() === address.toLowerCase()
	)

	return (
		<Layout>
			<Container>
				<Breadcumbs
					items={[
						{
							label: 'Address', // isValidator ? `Validator ${validator.moniker}` : isContract ? 'Contract' : 'Address',
							link: LinkMaker.address()
						},
						{ label: isMobile ? ellipseBetweenText(address) : address }
					]}
				/>
				{addressData ? (
					<>
						<AddressOverview validator={validator} address={address} addressData={addressData} />
						<AddressDetailTabs address={address} addressData={addressData} />
					</>
				) : (
					<h1 className="text contrast-color-70 margin-top-sm">
						{isMainnet
							? errorMessage
								? 'Something went wrong'
								: 'Address Not Found'
							: errorMessage || 'Address Not Found'}
					</h1>
				)}
			</Container>
		</Layout>
	)
}

export async function getServerSideProps({ params }) {
	let { address } = params

	if (address && address.startsWith('astra')) address = astraToEth(address)
	let errorMessage = ''
	let addressData

	if (web3.utils.isAddress(address)) {
		try {
			const addressRes = await cosmosApi.get<AddressDetailResponse>(`${API_LIST.ADDRESS_DETAIL}/${address}`)
			addressData = addressRes.data.result
			if (!addressData) {
				errorMessage = '404 Not Found'
			}
		} catch (e) {
			// console.log(e.message)
			Sentry.captureException(e)
			errorMessage = e.message
			if (e instanceof AxiosError) {
				if (e.code !== '200') errorMessage = '404 Not Found'
			}
		}
	} else {
		errorMessage = 'Address invalid'
	}

	return {
		props: {
			title: `Address ${address}`,
			errorMessage,
			address,
			addressData,
			description: `The Address ${address} page allows users to view transactions, balances, token holdings and transfers of ERC-20, ERC-721 and ERC-1155 (NFT) tokens, and analytics.`
		}
	}
}



export default AddressDetailPage
