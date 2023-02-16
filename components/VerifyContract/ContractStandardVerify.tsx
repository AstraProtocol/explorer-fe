import { NormalButton } from '@astraprotocol/astra-ui'
import { InputProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Input'
import * as Sentry from '@sentry/nextjs'
import axios from 'axios'
import clsx from 'clsx'
import FormItem, { FormRadioButtonData, FormSelectData, InputData } from 'components/FormItem'
import Row from 'components/Grid/Row'
import qs from 'qs'
import { useRef, useState } from 'react'
import AddressDisplay from './AddressDisplay'
import Header from './Header'
import styles from './style.module.scss'

interface Props {
	address: string
	onClose: Function
	onSuccess: Function
}

const ContractStandardVerify = ({ address, onClose, onSuccess }: Props) => {
	const contractNameRef = useRef(undefined)
	const [contractName, setContractName] = useState('')
	const [hasNightlyBuild, setHasNightlyBuild] = useState(true)
	const [compiler, setCompiler] = useState(undefined)
	const [hasOptimization, setOptimization] = useState(true)
	const [optimizeRun, setOptimizeRun] = useState(200)
	const [solidityCode, setSolidityCode] = useState('')
	const [fetchContructorArgAutomatically, setFetchContructrorArgAutomatically] = useState(true)

	const onReset = () => {
		// Reset data
		setContractName('')
		setHasNightlyBuild(true)
		setCompiler(undefined)
		setOptimization(true)
		setOptimizeRun(200)
		setSolidityCode('')
		setFetchContructrorArgAutomatically(true)
	}

	const onVerify = () => {
		const params = {
			'smart_contract[address_hash]': address,
			'smart_contract[name]': contractName,
			'smart_contract[nightly_builds]': hasNightlyBuild,
			'smart_contract[compiler_version]': 'v0.8.4+commit.c7e474f2', // compiler,
			'smart_contract[evm_version]': 'default', // evmVersion,
			'smart_contract[optimization]': hasOptimization,
			'smart_contract[optimization_runs]': optimizeRun,
			'smart_contract[contract_source_code]': solidityCode,
			'smart_contract[autodetect_constructor_args]': 'true',
			'smart_contract[constructor_arguments]': ''
		}

		const data = qs.stringify(params)
		var config = {
			method: 'post',
			url: `${process.env.NEXT_PUBLIC_EVM_API}/verify_smart_contract/contract_verifications`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data
		}

		axios(config)
			.then(function (response) {
				if (response.status > 200 && response.status < 300) {
					onSuccess()
				}
			})
			.catch(function (error) {
				Sentry.captureException(error)
				console.log(error)
			})
	}
	return (
		<div className={clsx(styles.modalVerify, 'radius-lg')}>
			<Header onClose={onClose} />
			<div style={{ overflowX: 'auto' }}>
				<div className={clsx(styles.paddingHoz, styles.container, styles.body)} style={{ minWidth: '795px' }}>
					<AddressDisplay classes="margin-bottom-xl" address={address} />
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

									value: contractName,
									onChange: e => setContractName(e.target.value),
									ref: ref => (contractNameRef.current = ref)
								} as InputProps,
								data: {
									id: 'verify-contract-name',
									tooltip: `Must match the name specified in the code. <br />
								For example, in contract MyContract {..}  <br />
								MyContract is the contract name.`
								} as InputData
							}}
						/>
						<FormItem
							label="Include nightly build:"
							type="radio-button"
							inputProps={{
								props: {
									style: { width: 160 },
									onClick: value => setHasNightlyBuild(value === 'yes')
								},
								data: {
									currentValue: hasNightlyBuild ? 'yes' : 'no',
									items: [
										{ label: 'Yes', value: 'yes' },
										{ label: 'No', value: 'no' }
									],
									id: 'verify-nightly-build',
									tooltip: `Select yes if you want to show nightly builds.`
								} as FormRadioButtonData
							}}
						/>
						<FormItem
							label="Compiler:"
							type="select"
							inputProps={{
								props: {
									classes: { wapper: styles.input, inputFont: clsx('text text-base', styles.color) },
									onSelect: v => setCompiler(v.value)
								},
								data: {
									currentValue: compiler,
									items: [
										{ label: 'Yes', value: 'yes' },
										{ label: 'No', value: 'no' }
									],
									id: 'verify-compiler',
									tooltip: `The compiler version is specified in pragma solidity X.X.X. Use the compiler version rather than the nightly build. If using the Solidity compiler, run solc —version to check.`
								} as FormSelectData
							}}
						/>

						<FormItem
							label="Standard Input JSON:"
							type="file"
							inputProps={{
								props: {
									// onChange: e => setSolidityCode(e.target.value),
									// classes: { wapper: styles.input, inputFont: clsx('text text-base', styles.color) },
									// value: solidityCode
								},
								data: {
									id: 'verify-contract-file-json',
									tooltip:
										'Drop the standard input JSON file created during contract compilation into the drop zone.'
								}
							}}
						/>
						<FormItem
							label="Try to fetch constructor arguments automatically:"
							type="radio-button"
							inputProps={{
								props: {
									onClick: value => setFetchContructrorArgAutomatically(value === 'yes'),
									style: { width: 160 }
								},
								data: {
									currentValue: fetchContructorArgAutomatically ? 'yes' : 'no',
									items: [
										{ label: 'Yes', value: 'yes' },
										{ label: 'No', value: 'no' }
									]
								} as FormRadioButtonData
							}}
						/>
					</div>
				</div>
			</div>
			<Row
				style={{ justifyContent: 'space-between' }}
				classes={clsx(styles.paddingHoz, styles.footer, 'padding-top-md padding-bottom-md')}
			>
				<NormalButton style={{ width: 78 }} onClick={onReset} variant="default">
					<span className="text text-base contrast-color-100">Reset</span>
				</NormalButton>
				<div>
					<NormalButton style={{ width: 170, marginRight: 10 }} onClick={onVerify}>
						<span className="text text-base contrast-color-100">Verify and Publish</span>
					</NormalButton>
					<NormalButton style={{ width: 86 }} onClick={() => onClose()} variant="text">
						<span className="text text-base contrast-color-100">Cancel</span>
					</NormalButton>
				</div>
			</Row>
		</div>
	)
}

export default ContractStandardVerify
