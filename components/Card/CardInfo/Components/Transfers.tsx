import { formatNumber } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import Typography from 'components/Typography'
import { isERC721, LinkMaker } from 'utils/helper'
import { Content } from '../'
import styles from '../style.module.scss'

const Transfers = ({ content }: { content: Content }) => {
	const data = content?.transfer || {}
	const isNFT = isERC721(data.tokenType)
	return (
		<div className="block-center sm-wrap flex-justify-start">
			<span
				className={clsx(
					styles.smallCard,
					'radius-sm block-center',
					'contrast-color-100',
					'padding-left-sm padding-right-sm padding-top-xs padding-bottom-xs',
					'margin-right-md'
				)}
			>
				<span className="padding-right-xs">From</span>
				<Typography.LinkText href={LinkMaker.address(data.from)}>{data.fromText}</Typography.LinkText>
				<CopyButton textCopy={data.from} />
			</span>
			<span
				className={clsx(
					styles.smallCard,
					'radius-sm block-center',
					'contrast-color-100',
					'padding-left-sm padding-right-sm padding-top-xs padding-bottom-xs',
					'margin-right-md',
					'sm-margin-top-xs'
				)}
			>
				<span className="padding-right-xs">To</span>
				<Typography.LinkText href={LinkMaker.address(data.to)}>{data.toText}</Typography.LinkText>
				<CopyButton textCopy={data.to} />
			</span>
			<span
				className={clsx(
					styles.smallCard,
					'radius-sm block-center',
					'contrast-color-100',
					'padding-left-sm padding-right-sm padding-top-xs padding-bottom-xs',
					'margin-right-md',
					'sm-margin-top-xs'
				)}
			>
				<span className="padding-right-xs">For</span>
				{isNFT ? (
					<>
						<Typography.LinkText
							classes="padding-right-xs"
							href={LinkMaker.token(data.tokenAddress, data.tokenId)}
						>
							TokenID [{data.tokenId}]
						</Typography.LinkText>
						<Typography.LinkText href={LinkMaker.token(data.tokenAddress)}>
							{data.tokenSymbol}
						</Typography.LinkText>
					</>
				) : (
					<>
						<span className="padding-right-xs">{formatNumber(content?.transfer.value)}</span>
						<Typography.LinkText href={LinkMaker.token(data.tokenAddress)}>
							{data.tokenSymbol}
						</Typography.LinkText>
					</>
				)}
			</span>
		</div>
	)
}

export default Transfers
