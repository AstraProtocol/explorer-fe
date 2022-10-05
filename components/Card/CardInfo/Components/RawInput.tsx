import CopyButton from 'components/Button/CopyButton'
import Tabs from 'components/Tabs/Tabs'
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
	return (
		<div style={{ maxWidth: '885px' }}>
			<Tabs
				tabs={[
					{ title: 'Hex', id: '1', padding: ' ' },
					{ title: 'UTF-8', id: '2', padding: ' ' }
				]}
				contents={{
					'1': <Copy text={text} />,
					'2': <Copy text={text} />
				}}
				classes=" "
				headerBorder={false}
				headerPadding="padding-left-sm"
			></Tabs>
		</div>
	)
}
