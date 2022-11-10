import { ModalWrapper, NormalButton, RadioButton } from '@astraprotocol/astra-ui'
import { InputProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Input'
import clsx from 'clsx'
import CloseButton from 'components/Button/CloseButton'
import FormItem, { FormRadioButtonData, FormSelectData } from 'components/FormItem'
import Row from 'components/Grid/Row'
import { useRef, useState } from 'react'
import styles from './style.module.scss'

interface Props {
	open: boolean
	onClose: Function
	address: string
}

enum Step {
	SELECT_OPTION,
	VERIFY_CONTRACT
}

enum VerifyOption {
	FLATTEN_CODE,
	STANDARD_INPUT
}

const ModalContractVerify = ({ open, onClose, address = '' }: Props) => {
	const [step, setStep] = useState(Step.SELECT_OPTION)
	const [option, setOption] = useState(VerifyOption.FLATTEN_CODE)

	const contractNameRef = useRef(undefined)

	const onNextVerify = () => {
		setStep(Step.VERIFY_CONTRACT)
	}

	const onCancel = () => {
		onReset()
		onClose()
	}

	const onReset = () => {
		setStep(Step.SELECT_OPTION)
	}

	const Header = () => (
		<Row
			style={{ justifyContent: 'space-between', flex: 0 }}
			classes={clsx(
				styles.container,
				styles.borderColor,
				'padding-left-lg padding-right-lg padding-top-md padding-bottom-md '
			)}
		>
			<span className="text text-2xl same-color-100">Solidity Smart Contract Verification</span>
			<CloseButton onClose={onClose} />
		</Row>
	)

	const AddressDisplay = ({ classes = '' }) => (
		<div
			className={clsx(
				'contrast-bg-color-20 padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm',
				classes
			)}
		>
			<div className="same-color-50 text text-base">Contract Address</div>
			<div className="same-color-100 money money-sm">{address}</div>
		</div>
	)

	const SelectVerifyOption = () => (
		<div className={clsx(styles.modalVerify, step !== Step.SELECT_OPTION && styles.hidden, 'radius-lg')}>
			<Header />
			<div className={clsx(styles.container, styles.body)}>
				<AddressDisplay />
				<div className="margin-top-xl">
					<div className="text text-lg same-color-100 padding-bottom-xs">Verify Method</div>
					<Row style={{ justifyContent: 'space-between' }}>
						<RadioButton
							text="Via flattened source code"
							style={{ width: '100%' }}
							classes={{ other: 'margin-right-md' }}
							onClick={e => {
								setOption(VerifyOption.FLATTEN_CODE)
							}}
							value="flattened-code"
							checked={option === VerifyOption.FLATTEN_CODE}
						/>
						<RadioButton
							text="Via standard input JSON"
							style={{ width: '100%' }}
							onClick={() => setOption(VerifyOption.STANDARD_INPUT)}
							value="standard-code"
							checked={option === VerifyOption.STANDARD_INPUT}
						/>
					</Row>
				</div>
			</div>
			<Row
				style={{ justifyContent: 'flex-end', flex: 0 }}
				classes={clsx(styles.container, styles.footer, 'padding-top-md padding-bottom-md')}
			>
				<></>
				<NormalButton style={{ width: 128 }} onClick={onNextVerify}>
					<span className="text text-base same-color-100">Next</span>
				</NormalButton>
			</Row>
		</div>
	)

	const ContractVerify = () => (
		<div className={clsx(styles.modalVerify, step !== Step.VERIFY_CONTRACT && styles.hidden, 'radius-lg')}>
			<Header />
			<div className={clsx(styles.container, styles.body)}>
				<AddressDisplay classes="margin-bottom-xl" />
				<div className={clsx('margin-bottom-xl border border-bottom-base', styles.borderColor)}>
					<FormItem
						label="Contract Name:"
						type="input"
						inputProps={{
							props: {
								placeholder: 'Enter contract name',
								classes: {
									wapper: clsx('text text-base', styles.color, styles.input),
									inputFont: clsx('text text-base', styles.color)
								},
								ref: ref => (contractNameRef.current = ref)
							} as InputProps
						}}
					/>
					<FormItem
						label="Include nightly build:"
						type="radio-button"
						inputProps={{
							props: {
								style: { width: 160 }
							},
							data: {
								onClick: () => console.log('select'),
								currentValue: 'yes',
								items: [
									{ label: 'Yes', value: 'yes' },
									{ label: 'No', value: 'no' }
								]
							} as FormRadioButtonData
						}}
					/>
					<FormItem
						label="Compiler:"
						type="select"
						inputProps={{
							props: {
								classes: { wapper: styles.input, inputFont: clsx('text text-base', styles.color) }
							},
							data: {
								onSelect: () => console.log('select'),
								currentValue: 'yes',
								items: [
									{ label: 'Yes', value: 'yes' },
									{ label: 'No', value: 'no' }
								]
							} as FormSelectData
						}}
					/>
					<FormItem
						label="EVM Version:"
						type="select"
						inputProps={{
							props: {
								classes: { wapper: styles.input, inputFont: clsx('text text-base', styles.color) }
							},
							data: {
								onSelect: () => console.log('select'),
								currentValue: 'yes',
								items: [
									{ label: 'Yes', value: 'yes' },
									{ label: 'No', value: 'no' }
								]
							} as FormSelectData
						}}
					/>
					<FormItem
						label="Optimization:"
						type="radio-button"
						inputProps={{
							props: {
								style: { width: 160 }
							},
							data: {
								onClick: () => console.log('select'),
								currentValue: 'yes',
								items: [
									{ label: 'Yes', value: 'yes' },
									{ label: 'No', value: 'no' }
								]
							} as FormRadioButtonData
						}}
					/>

					<FormItem
						label="Optimize run:"
						type="input-number"
						inputProps={{
							props: {
								classes: { wapper: styles.input, inputFont: clsx('text text-base', styles.color) },

								defaultValue: 200
							}
						}}
					/>
					<FormItem
						label="Enter the Solidity Contract Code:"
						type="text-field"
						inputProps={{
							props: {
								classes: { wapper: styles.input, inputFont: clsx('text text-base', styles.color) }
							}
						}}
					/>
					<FormItem
						label="Try to fetch constructor arguments automatically:"
						type="radio-button"
						inputProps={{
							props: {
								style: { width: 160 }
							},
							data: {
								onClick: () => console.log('select'),
								currentValue: 'yes',
								items: [
									{ label: 'Yes', value: 'yes' },
									{ label: 'No', value: 'no' }
								]
							} as FormRadioButtonData
						}}
					/>
				</div>
			</div>
			<Row
				style={{ justifyContent: 'space-between' }}
				classes={clsx(styles.container, styles.footer, 'padding-top-md padding-bottom-md')}
			>
				<NormalButton style={{ width: 78 }} onClick={onReset} variant="default">
					<span className="text text-base same-color-100">Reset</span>
				</NormalButton>
				<div>
					<NormalButton style={{ width: 170, marginRight: 10 }} onClick={onNextVerify}>
						<span className="text text-base same-color-100">Verify and Publish</span>
					</NormalButton>
					<NormalButton style={{ width: 86 }} onClick={onCancel} variant="text">
						<span className="text text-base same-color-100">Cancel</span>
					</NormalButton>
				</div>
			</Row>
		</div>
	)

	return (
		<ModalWrapper classes={{ wrapperContent: styles.modalVerifyWrapper }} open={open}>
			<SelectVerifyOption />
			<ContractVerify />
		</ModalWrapper>
	)
}

export default ModalContractVerify
