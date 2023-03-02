import { Breadcumbs, useMobileLayout } from '@astraprotocol/astra-ui'
import * as Sentry from '@sentry/react'
import { cosmosApi } from 'api'
import API_LIST from 'api/api_list'
import { AxiosError } from 'axios'
import Container from 'components/Container'
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

	const isMainnet = window?.location?.hostname?.includes('.astranaut.io')
	const title = tokenData
		? `${tokenData.name} (${tokenData.symbol}) - ${process.env.NEXT_PUBLIC_TITLE}`
		: `Token ${token}`
	return (
		<Layout>
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
					<h1 className="text contrast-color-70 margin-top-sm">
						{isMainnet
							? errorMessage
								? 'Something went wrong'
								: 'Token Not Found'
							: errorMessage || 'Token Not Found'}
					</h1>
				)}
			</Container>
		</Layout>
	)
}

export async function getServerSideProps({ params }) {
	const { token } = params
	let errorMessage = ''
	let tokenData
	if (Web3.utils.isAddress(token, 11115)) {
		try {
			const response = await cosmosApi.get<TokenDetailResponse>(`${API_LIST.TOKEN_DETAIL}${token}`)
			if (response?.data?.result) {
				tokenData = response.data.result
			} else {
				errorMessage = response.data.message
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
			tokenData,
			title: tokenData ? tokenData.name : `Token ${token}`,
			description: tokenData ? tokenData.name : `Token ${token}`
		}
	}
}

export default TokenDetailPage
