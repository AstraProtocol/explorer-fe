import { Breadcumbs, useMobileLayout } from '@astraprotocol/astra-ui'
import * as Sentry from '@sentry/nextjs'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { AxiosError } from 'axios'
import Container from 'components/Container'
import Head from 'next/head'
import React from 'react'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
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
	const title = tokenData ? `${tokenData.name} (${tokenId}) - ${process.env.NEXT_PUBLIC_TITLE}` : `Token ${token}`

	return (
		<Layout>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<title>{title}</title>
			</Head>
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

	if (Web3.utils.isAddress(token, parseInt(process.env.NEXT_PUBLIC_CHAIN_ID) || 11115)) {
		try {
			const tokenData = await cosmosApi.get<TokenInstanceResponse>(
				`${API_LIST.TOKEN_METADATA}contractaddress=${token}/tokenid=${index}`
			)
			if (tokenData.data.result) {
				return {
					props: {
						errorMessage: '',
						token,
						tokenId: index,
						tokenData: tokenData.data.result.result
					}
				}
			}
			return {
				props: {
					errorMessage: tokenData.data.message,
					token,
					tokenId: index,
					tokenData: null
				}
			}
		} catch (err) {
			Sentry.captureException(err)
			let errorMessage = err.message
			if (err instanceof AxiosError) {
				console.log('error api', err.message, err.code, err?.config?.baseURL, err?.config?.url)
				if (err.code !== '200') errorMessage = '404 Not Found'
			}
			return {
				props: {
					errorMessage: err.message,
					token,
					tokenId: index,
					tokenData: null
				}
			}
		}
	}
	return {
		props: {
			message: 'Token address invalid',
			token,
			tokenData: null
		}
	}
}

export default TokenInstanceDetailPage
