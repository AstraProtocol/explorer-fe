import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import Typography from 'components/Typography'
import { LinkMaker } from 'utils/helper'
import { Content } from '../'
import styles from '../style.module.scss'

const Transfers = ({ content }: { content: Content }) => {
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
				<Typography.LinkText href={LinkMaker.address(content?.transfer?.from)}>
					{content?.transfer?.fromText}
				</Typography.LinkText>
				<CopyButton textCopy={content?.transfer?.from} />
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
				<Typography.LinkText href={LinkMaker.address(content?.transfer?.to)}>
					{content?.transfer?.toText}
				</Typography.LinkText>
				<CopyButton textCopy={content?.transfer?.to} />
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
				<span className="padding-right-xs">{content?.transfer.value}</span>
				<Typography.LinkText href={LinkMaker.address(content?.transfer?.to)}>
					{content?.transfer?.token}
				</Typography.LinkText>
			</span>
		</div>
	)
}

export default Transfers
