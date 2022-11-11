import { NormalButton } from '@astraprotocol/astra-ui'
import { InputProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Input'
import { InputProps as InputNumberProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Input/NumberInput'
import clsx from 'clsx'
import FormItem, { FormRadioButtonData, FormSelectData, InputData } from 'components/FormItem'
import Row from 'components/Grid/Row'
import { MouseEventHandler, useRef, useState } from 'react'
import AddressDisplay from './AddressDisplay'
import Header from './Header'
import styles from './style.module.scss'

interface Props {
	address: string
	onClose: Function
	onCancel: MouseEventHandler<HTMLButtonElement>
}

interface LibraryItem {
	index: number
	name: string
	address: string
}

const ContractVerify = ({ address, onClose, onCancel }: Props) => {
	const contractNameRef = useRef(undefined)
	const [contractName, setContractName] = useState('')
	const [hasNightlyBuild, setHasNightlyBuild] = useState(true)
	const [compiler, setCompiler] = useState(undefined)
	const [evmVersion, setEvmVersion] = useState(undefined)
	const [hasOptimization, setOptimization] = useState(true)
	const [optimizeRun, setOptimizeRun] = useState(200)
	const [solidityCode, setSolidityCode] = useState('')
	const [fetchContructorArgAutomatically, setFetchContructrorArgAutomatically] = useState(true)
	const [libs, setLib] = useState<LibraryItem[]>([])

	const addLibraryItem = () => {
		if (libs.length > 10) return

		const newLib = {
			index: libs.length,
			name: '',
			address: ''
		}
		setLib([...libs, newLib])
	}

	const onReset = () => {
		// Reset data
		setContractName('')
		setHasNightlyBuild(true)
		setCompiler(undefined)
		setEvmVersion(undefined)
		setOptimization(true)
		setOptimizeRun(200)
		setSolidityCode('')
		setFetchContructrorArgAutomatically(true)
		setLib([])
	}

	const onVerify = () => {
		// Verify data
	}
	return (
		<div className={clsx(styles.modalVerify, 'radius-lg')}>
			<Header onClose={onClose} />
			<div className={clsx(styles.paddingHoz, styles.container, styles.body)}>
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
						label="EVM Version:"
						type="select"
						inputProps={{
							props: {
								classes: { wapper: styles.input, inputFont: clsx('text text-base', styles.color) },
								onSelect: v => setEvmVersion(v.value)
							},
							data: {
								currentValue: evmVersion,
								items: [
									{ label: 'Yes', value: 'yes' },
									{ label: 'No', value: 'no' }
								],
								id: 'verify-evm-version',
								tooltip:
									'The EVM version the contract is written for. If the bytecode does not match the version, we try to verify using the latest EVM version. EVM version details.'
							} as FormSelectData
						}}
					/>
					<FormItem
						label="Optimization:"
						type="radio-button"
						inputProps={{
							props: {
								style: { width: 160 },
								onClick: value => setOptimization(value === 'yes')
							},
							data: {
								currentValue: hasOptimization ? 'yes' : 'no',
								items: [
									{ label: 'Yes', value: 'yes' },
									{ label: 'No', value: 'no' }
								],
								id: 'verify-optimization',
								tooltip: 'If you enabled optimization during compilation, select yes.'
							} as FormRadioButtonData
						}}
					/>

					<FormItem
						label="Optimize run:"
						type="input-number"
						inputProps={{
							props: {
								classes: { wapper: styles.input, inputFont: clsx('text text-base', styles.color) },
								value: optimizeRun,
								onValueChange: (value: any) => setOptimizeRun(value.floatValue),
								defaultValue: 200
							} as InputNumberProps
						}}
					/>
					<FormItem
						label="Enter the Solidity Contract Code:"
						type="text-field"
						inputProps={{
							props: {
								onChange: e => setSolidityCode(e.target.value),
								classes: { wapper: styles.input, inputFont: clsx('text text-base', styles.color) },
								value: solidityCode
							},
							data: {
								id: 'verify-contract-code',
								tooltip:
									'We recommend using flattened code. This is necessary if your code utilizes a library or inherits dependencies. Use the POA solidity flattener or the truffle flattener.'
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
				{libs.map((lib: LibraryItem) => {
					const updatedLibs: LibraryItem[] = [...libs]
					return (
						<>
							<FormItem
								key={lib.index}
								label={`Library ${lib.index + 1} Name:`}
								type="input"
								inputProps={{
									props: {
										placeholder: `Name`,
										classes: {
											wapper: clsx('text text-base', styles.color, styles.input),
											inputFont: clsx('text text-base', styles.color)
										},

										value: updatedLibs[lib.index].name,
										onChange: e => {
											updatedLibs[lib.index].name = e.target.value
											setLib(updatedLibs)
										},
										ref: ref => (contractNameRef.current = ref)
									} as InputProps,
									data: {
										id: `verify-contract-lib-${lib.index}-name`,
										tooltip: `A library name called in the .sol file. <br />Multiple libraries (up to 10) may be added for each contract. <br />Click the Add Library button to add an additional one.`
									} as InputData
								}}
							/>
							<FormItem
								key={lib.index}
								label={`Library ${lib.index + 1} Address:`}
								type="input"
								inputProps={{
									props: {
										placeholder: `Address`,
										classes: {
											wapper: clsx('text text-base', styles.color, styles.input),
											inputFont: clsx('text text-base', styles.color)
										},

										value: updatedLibs[lib.index].address,
										onChange: e => {
											updatedLibs[lib.index].address = e.target.value
											setLib(updatedLibs)
										},
										ref: ref => (contractNameRef.current = ref)
									} as InputProps,
									data: {
										id: `verify-contract-lib-${lib.index}-address`,
										tooltip: `The 0x library address. <br />This can be found in the generated json file or Truffle output (if using truffle).`
									} as InputData
								}}
							/>
						</>
					)
				})}
				<NormalButton style={{ width: 207, marginRight: 10 }} onClick={addLibraryItem}>
					<span className="text text-base contrast-color-100">Add Contract Library</span>
				</NormalButton>
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
					<NormalButton style={{ width: 86 }} onClick={onCancel} variant="text">
						<span className="text text-base contrast-color-100">Cancel</span>
					</NormalButton>
				</div>
			</Row>
		</div>
	)
}

export default ContractVerify
