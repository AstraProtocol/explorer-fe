import CopyButton from 'components/Button/CopyButton'
import Tabs from 'components/Tabs/Tabs'
import { convertHexToUtf8 } from 'utils/helper'
import { isHex } from 'web3-utils'
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
	const isHexString = isHex(text)
	try {
		utf8Text = convertHexToUtf8(text)
	} catch (e) {}

	if (!isHexString) {
		return (
			<div style={{ maxWidth: '885px', maxHeight: '200px', overflowY: 'auto' }}>
				<Copy text={utf8Text} />
			</div>
		)
	}

	return (
		<div style={{ maxWidth: '885px', maxHeight: '200px', overflowY: 'auto' }}>
			<Tabs
				tabs={[
					{ title: 'Hex', id: 'hex', padding: ' ' },
					utf8Text && { title: 'UTF-8', id: 'utf8', padding: ' ' }
				]}
				contents={{
					hex: <Copy text={text} />,
					utf8: utf8Text && <Copy text={utf8Text} />
				}}
				classes="padding-top-xs"
				headerBorder={false}
				headerPadding="padding-left-sm"
			/>
		</div>
	)
}
