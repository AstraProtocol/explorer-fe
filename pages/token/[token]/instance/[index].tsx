import { Breadcumbs, useMobileLayout } from '@astraprotocol/astra-ui'
import * as Sentry from '@sentry/react'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { AxiosError } from 'axios'
import Container from 'components/Container'
import React from 'react'
import { CHAIN_ID } from 'utils/constants'
import { LinkMaker, ellipseBetweenText } from 'utils/helper'
import NftDetailTab from 'views/tokens/[instance]/NftDetailTab'
import NftOverview from 'views/tokens/[instance]/NftOverview'
import Web3 from 'web3'
import Layout from '../../../../components/Layout'

type Props = {
	token: string
	tokenId: string
	tokenData: TokenNFTMetadata
	errorMessage?: string
}

const TokenInstanceDetailPage: React.FC<Props> = props => {
	const { isMobile } = useMobileLayout()
	const { token, tokenData, tokenId, errorMessage } = props
	return (
		<Layout>
			<Container>
				<Breadcumbs
					items={[
						{ label: 'Token', link: LinkMaker.token() },
						{ label: isMobile ? ellipseBetweenText(token) : token, link: LinkMaker.token(token) },
						{ label: tokenId }
					]}
				/>

				{tokenData ? (
					<>
						<NftOverview token={token} tokenId={tokenId} tokenData={tokenData} />
						<NftDetailTab token={token} tokenId={tokenId} tokenData={tokenData} />
					</>
				) : (
					<h1 className="text contrast-color-70 margin-top-sm">{errorMessage || 'Token Not Found'}</h1>
				)}
			</Container>
		</Layout>
	)
}

export async function getServerSideProps({ params }) {
	const { token, index } = params
	let errorMessage = ''
	let tokenData

	if (Web3.utils.isAddress(token, CHAIN_ID)) {
		try {
			const response = await cosmosApi.get<TokenInstanceResponse>(
				`${API_LIST.TOKEN_METADATA}contractaddress=${token}/tokenid=${index}`
			)

			if (response?.data?.result) {
				tokenData = response.data.result.result
			} else {
				errorMessage = response?.data?.message
			}
		} catch (err) {
			Sentry.captureException(err)
			errorMessage = err.message
			if (err instanceof AxiosError) {
				if (err.code !== '200') errorMessage = '404 Not Found'
			}
		}
	} else {
		errorMessage = 'Token address invalid'
	}

	return {
		props: {
			errorMessage,
			token,
			tokenId: index,
			tokenData: tokenData || {},
			title: tokenData ? tokenData.name : `Token ${token} ID #${index}`,
			description: tokenData ? tokenData.description : 'Token Description'
		}
	}
}

export default TokenInstanceDetailPage

