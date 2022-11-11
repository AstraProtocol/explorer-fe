import { NormalButton, RadioButton } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Row from 'components/Grid/Row'
import { VerifyOption } from '.'
import AddressDisplay from './AddressDisplay'
import Header from './Header'
import styles from './style.module.scss'

interface Props {
	address: string
	currentOption: VerifyOption
	onNext: Function
	onClose: Function
	onSelectOption: Function
}

const SelectVerifyOption = ({ address, onNext, currentOption, onClose, onSelectOption }: Props) => {
	const onNextVerify = () => {
		onNext()
	}
	return (
		<div className={clsx(styles.modalVerify, 'radius-lg')}>
			<Header onClose={onClose} />
			<div className={clsx(styles.container, styles.paddingHoz, styles.body)}>
				<AddressDisplay address={address} />
				<div className="margin-top-xl">
					<div className="text text-lg contrast-color-100 padding-bottom-xs">Verify Method</div>
					<Row style={{ justifyContent: 'space-between' }}>
						<RadioButton
							text="Via flattened source code"
							style={{ width: '100%' }}
							classes={{ other: 'margin-right-md' }}
							onClick={e => {
								onSelectOption(VerifyOption.FLATTEN_CODE)
							}}
							value="flattened-code"
							checked={currentOption === VerifyOption.FLATTEN_CODE}
						/>
						<RadioButton
							text="Via standard input JSON"
							style={{ width: '100%' }}
							onClick={() => onSelectOption(VerifyOption.STANDARD_INPUT)}
							value="standard-code"
							checked={currentOption === VerifyOption.STANDARD_INPUT}
						/>
					</Row>
				</div>
			</div>
			<Row
				style={{ justifyContent: 'flex-end', flex: 0 }}
				classes={clsx(styles.container, styles.paddingHoz, styles.footer, 'padding-top-md padding-bottom-md')}
			>
				<></>
				<NormalButton style={{ width: 128 }} onClick={onNextVerify}>
					<span className="text text-base contrast-color-100">Next</span>
				</NormalButton>
			</Row>
		</div>
	)
}
export default SelectVerifyOption
