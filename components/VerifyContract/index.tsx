import { ModalWrapper } from '@astraprotocol/astra-ui'
import { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import ContractVerify from './ContractFlattenedVerify'
import ContractStandardVerify from './ContractStandardVerify'
import SelectVerifyOption from './SelectVerifyOption'
import styles from './style.module.scss'

interface Props {
	open: boolean
	onClose: Function
	onSuccess: Function
	address: string
}

export enum Step {
	SELECT_OPTION,
	VERIFY_CONTRACT
}

export enum VerifyOption {
	FLATTEN_CODE,
	STANDARD_INPUT
}

const ModalContractVerify = ({ open, onClose, onSuccess, address = '' }: Props) => {
	const [step, setStep] = useState(Step.SELECT_OPTION)
	const [currentOption, setOption] = useState(VerifyOption.FLATTEN_CODE)

	const onNext = () => {
		setStep(Step.VERIFY_CONTRACT)
	}

	const onSelectOption = (_option: VerifyOption) => {
		setOption(_option)
	}

	const onVerifySuccess = () => {
		onReset()
		onSuccess()
	}

	const onCancel = () => {
		onReset()
		onClose()
	}

	const onReset = () => {
		setStep(Step.SELECT_OPTION)
		setOption(VerifyOption.FLATTEN_CODE)
	}

	let content = (
		<SelectVerifyOption
			onClose={onClose}
			currentOption={currentOption}
			address={address}
			onNext={onNext}
			onSelectOption={onSelectOption}
		/>
	)
	if (step === Step.VERIFY_CONTRACT) {
		switch (currentOption) {
			case VerifyOption.FLATTEN_CODE:
				content = <ContractVerify address={address} onClose={onCancel} onSuccess={onVerifySuccess} />
				break
			case VerifyOption.STANDARD_INPUT:
				content = <ContractStandardVerify address={address} onClose={onCancel} onSuccess={onVerifySuccess} />
				break
		}
	}

	useEffect(() => {
		ReactTooltip.rebuild()
	}, [])

	return (
		<ModalWrapper classes={{ wrapperContent: styles.modalVerifyWrapper }} open={open}>
			{content}
		</ModalWrapper>
	)
}

export default ModalContractVerify
