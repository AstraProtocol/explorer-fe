import { CopyButton, ellipseBetweenText } from '@astraprotocol/astra-ui'
import Typography from 'components/Typography'
import Image from 'next/image'
import { Content, InternalTransferContent } from '..'

const ContractTransferInternal = ({ content }: { content: Content }) => {
	return (
		<div className="col">
			<div className="row">
				<Typography.LinkText href={content.link || ''}>
					<span className="text text-base icon-contract contrast-color-70 margin-right-2xs" />
					{content.text || content.value}
				</Typography.LinkText>
				<CopyButton textCopy={content.value as string} />
			</div>
			{content.internalTransfer?.map((t: InternalTransferContent) => (
				<div key={t.index} className="margin-left-sm margin-top-xs">
					<Image
						className="contrast-color-100"
						alt="internal-tx"
						src={'/images/icons/shape.svg'}
						width={8}
						height={8}
					/>
					<span className="margin-left-xs text text-sm contrast-color-70">
						Transfer <span className="money money-sm">{t.value} ASA</span>
						{'  '}
						From{'  '}
						<Typography.LinkText href={t.from || ''}>
							{t.fromText ? `${t.fromText} (${ellipseBetweenText(t.from)})` : ellipseBetweenText(t.from)}
						</Typography.LinkText>
						{'  '}
						To{'  '}
						<Typography.LinkText href={t.to || ''}>
							{t.toText ? `${t.toText} (${ellipseBetweenText(t.to)})` : ellipseBetweenText(t.to)}
						</Typography.LinkText>
					</span>
				</div>
			))}
		</div>
	)
}

export default ContractTransferInternal
