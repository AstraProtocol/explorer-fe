import { Breadcumbs, useMobileLayout } from '@astraprotocol/astra-ui'
import { evmApi } from 'api'
import API_LIST from 'api/api_list'
import { AxiosError } from 'axios'
import Container from 'components/Container'
import Head from 'next/head'
import React from 'react'
import { ellipseBetweenText, LinkMaker } from 'utils/helper'
import TokenDetailTab from 'views/tokens/TokenDetailTabs'
import TokenOverview from 'views/tokens/TokenOverview'
import Web3 from 'web3'
import Layout from '../../components/Layout'

type Props = {
	token: string
	tokenData: Token
	errorMessage?: string
}

const TokenDetailPage: React.FC<Props> = props => {
	const { isMobile } = useMobileLayout()
	const { token, tokenData, errorMessage } = props

	const title = tokenData
		? `${tokenData.name} (${tokenData.symbol}) - ${process.env.NEXT_PUBLIC_TITLE}`
		: `Token ${token}`
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
						{ label: isMobile ? ellipseBetweenText(token) : token }
					]}
				/>
				{tokenData ? (
					<>
						<TokenOverview token={token} tokenData={tokenData} />
						<TokenDetailTab token={token} tokenData={tokenData} />
					</>
				) : (
					<h1 className="text contrast-color-70 margin-top-sm">{errorMessage || 'Token Not Found'}</h1>
				)}
			</Container>
		</Layout>
	)
}

export async function getServerSideProps({ params }) {
	const { token } = params
	if (Web3.utils.isAddress(token, 11115)) {
		try {
			const tokenData = await evmApi.get<TokenDetailResponse>(`${API_LIST.TOKEN_DETAIL}${token}`)
			if (tokenData.data.result) {
				return {
					props: {
						errorMessage: '',
						token,
						tokenData: tokenData.data.result
					}
				}
			}
			return {
				props: {
					errorMessage: tokenData.data.message,
					token,
					tokenData: null
				}
			}
		} catch (err) {
			let errorMessage = err.message
			if (err instanceof AxiosError) {
				console.log('error api', err.message, err.code, err?.config?.baseURL, err?.config?.url)
				if (err.code !== '200') errorMessage = '404 Not Found'
			}
			return {
				props: {
					errorMessage: err.message,
					token,
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

export default TokenDetailPage
