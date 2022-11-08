import { useMobileLayout } from '@astraprotocol/astra-ui'
import Container from 'components/Container'
import Layout from 'components/Layout'
import Head from 'next/head'
import React from 'react'

type Props = {
	errorMessage?: string
	address: string
	addressData: Address
}

const ContractVerifyPage: React.FC<Props> = props => {
	const { isMobile } = useMobileLayout()
	const { address, addressData, errorMessage } = props

	return (
		<Layout>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<title>Verify Contract</title>
			</Head>
			<Container>
				<iframe
					src="https://blockscout.astranaut.dev/address/0x23c5d4a327EAcCAfcb6438F96aa3df84aB1486e3/verify-via-flattened-code/new"
					height={1000}
					width={1200}
				/>
			</Container>
		</Layout>
	)
}

// export async function getServerSideProps({ params }) {}

export default ContractVerifyPage
