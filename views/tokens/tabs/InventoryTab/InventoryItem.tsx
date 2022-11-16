import clsx from 'clsx'
import Typography from 'components/Typography'
import Image from 'next/image'
import { LinkMaker } from 'utils/helper'
import styles from './style.module.scss'

type Props = {
	tokenAddress: string
	index: number
	token: TokenNFTInstance
}

export default function InventoryItem({ index, tokenAddress, token }: Props) {
	const tokenImage = token?.metadata?.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
	return (
		<div
			className={clsx(
				styles.holderRow,
				'row padding-left-lg',
				'padding-right-lg padding-top-sm padding-bottom-sm'
				// 'margin-bottom-xs'
			)}
		>
			{/* <div className={clsx('text text-base contrast-color-70 text-center', styles.colIndex)}>{index}</div> */}
			<div className={clsx(styles.borderLeft, styles.colId, 'col-1 padding-left-lg block-ver-center')}>
				<Typography.LinkText href={LinkMaker.token(tokenAddress, token.tokenId)} classes={'text text-base'}>
					{token.tokenId}
				</Typography.LinkText>
			</div>
			<div className={clsx(styles.borderLeft, styles.colOwner, 'col-5 padding-left-lg block-ver-center')}>
				<Typography.LinkText href={LinkMaker.address(token.ownerAddress)} classes={'text text-base'}>
					{token.ownerAddress}
				</Typography.LinkText>
			</div>
			<div className={clsx(styles.borderLeft, styles.colImage, 'col-6 padding-left-lg block-ver-center')}>
				{tokenImage && <Image src={tokenImage} alt={token.tokenId} height={50} width={80} layout="fixed" />}
			</div>
		</div>
	)
}
