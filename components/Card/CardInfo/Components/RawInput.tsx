import * as Sentry from '@sentry/react'
import CopyButton from 'components/Button/CopyButton'
import Tabs from 'components/Tabs/Tabs'
import web3 from 'web3'
import styles from '../style.module.scss'

type RawInputProps = {
	text?: string
}

const Copy = ({ text }) => {
	return (
		<div className={styles.rawInput}>
			<CopyButton
				textCopy={text}
				textTitle={text}
				textColor="contrast-color-70 text text-base"
				textClasses="margin-right-md"
			/>
		</div>
	)
}

export default function RawInput({ text }: RawInputProps) {
	let utf8Text = text
	try {
		utf8Text = web3.utils.toAscii(text)
	} catch (e) {
		Sentry.captureException(e)
	}
	return (
		<div style={{ maxWidth: '885px', maxHeight: '200px', overflowY: 'auto' }}>
			<Tabs
				tabs={[
					{ title: 'Hex', id: 'hex', padding: ' ' },
					{ title: 'UTF-8', id: 'utf8', padding: ' ' }
				]}
				contents={{
					hex: <Copy text={text} />,
					utf8: <Copy text={utf8Text} />
				}}
				classes="padding-top-xs"
				headerBorder={false}
				headerPadding="padding-left-sm"
			/>
		</div>
	)
}
