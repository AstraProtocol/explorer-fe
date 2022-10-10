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
	} catch (e) {}
	return (
		<div style={{ maxWidth: '885px' }}>
			<Tabs
				tabs={[
					{ title: 'Hex', id: '1', padding: ' ' },
					{ title: 'UTF-8', id: '2', padding: ' ' }
				]}
				contents={{
					'1': <Copy text={text} />,
					'2': <Copy text={utf8Text} />
				}}
				classes=" "
				headerBorder={false}
				headerPadding="padding-left-sm"
			></Tabs>
		</div>
	)
}
