import { useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import Image from 'next/image'

interface Props {
	token: string
	tokenId: string
	tokenData: TokenNFTMetadata
}

const NftOverview = ({ token, tokenData, tokenId }: Props) => {
	const { isMobile } = useMobileLayout()
	const size = isMobile ? 200 : 800
	const Layout = ({ children }) =>
		isMobile ? (
			<div style={{ display: 'flex', flexDirection: 'column-reverse' }}>{children}</div>
		) : (
			<Row>{children}</Row>
		)
	const tokenImage = tokenData?.image?.replace('ipfs://', 'https://ipfs.io/ipfs/')
	return (
		<BackgroundCard classes="padding-top-lg padding-bottom-lg margin-top-2xl padding-left-2xl padding-right-2xl">
			<Layout>
				<div className="margin-right-md">
					<Row style={{ justifyContent: 'space-between' }}>
						<div className="text text-base contrast-color-50">Token ID:</div>
						<div className="text text-base">{tokenId}</div>
					</Row>
					<Row style={{ justifyContent: 'space-between' }}>
						<div className="text text-base contrast-color-50">Name:</div>
						<div className="text text-base">{tokenData.name}</div>
					</Row>

					{/* <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}> */}
					<div className="text text-base contrast-color-50">Description:</div>
					<div className="text text-base">&quot;{tokenData.description}&quot;</div>
					{/* </Row> */}
				</div>
				<div className={clsx(isMobile ? 'margin-bottom-md' : 'flex flex-justify-end')}>
					{tokenImage && <Image src={tokenImage} alt={tokenData.name} width={size} height={size} />}
				</div>
			</Layout>
		</BackgroundCard>
	)
}

export default NftOverview
