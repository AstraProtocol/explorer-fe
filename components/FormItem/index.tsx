import { Form, RadioButton } from '@astraprotocol/astra-ui'
import { InputProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Input'
import { InputProps as InputNumberProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Input/NumberInput'
import { TextAreaProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Input/TextArea'
import { SelectProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Select'
import { RadioButtonProps } from '@astraprotocol/astra-ui/lib/es/components/RadioButton'
import Row from 'components/Grid/Row'
import Dropzone from 'react-dropzone'
import ReactTooltip from 'react-tooltip'
import styles from './style.module.scss'

interface Tooltip {
	id?: string
	tooltip?: string
}

export interface Option {
	label: string
	value: string
}

export interface FormRadioButtonData extends Tooltip {
	items: Option[]
	currentValue?: string | number
}

export interface FormSelectData extends Tooltip {
	items: Option[]
	currentValue?: string | number
}

export interface InputData extends Tooltip {}
export interface InputNumberData extends Tooltip {}
export interface TextAreaData extends Tooltip {}

interface Props {
	label: string
	type: 'input' | 'select' | 'radio-button' | 'text-field' | 'input-number' | 'file'
	inputProps: {
		props?: InputProps | SelectProps | RadioButtonProps | TextAreaProps
		data?: FormRadioButtonData | FormSelectData | any
	}
}

const FormItem = ({ label, type, inputProps }: Props) => {
	let content
	let data
	let props
	switch (type) {
		case 'input':
			props = inputProps.props as InputProps
			data = inputProps.data as InputData
			content = <Form.Input data-tip={data?.tooltip} data-for={data?.id} {...props} />
			break
		case 'radio-button':
			props = inputProps.props as RadioButtonProps
			data = inputProps.data as FormRadioButtonData
			content = (
				<div data-tip={data?.tooltip} data-for={data?.id}>
					<Row>
						{data.items.map((o: Option) => (
							<RadioButton
								{...props}
								text={o.label}
								value={o.value}
								key={o.value}
								onClick={() => props.onClick(o.value)}
								checked={o.value === inputProps.data.currentValue}
								classes={{ other: 'margin-right-md' }}
							/>
						))}
					</Row>
				</div>
			)
			break
		case 'select':
			props = inputProps.props as SelectProps
			data = inputProps.data as FormSelectData

			content = (
				<Form.Select
					data-tip={data?.tooltip}
					data-for={data?.id}
					onChange={value => props.onSelect(value)}
					options={data.items}
					defaultInputValue={data.currentValue}
					{...props}
				/>
			)
			break
		case 'input-number':
			props = inputProps.props as InputNumberProps
			data = inputProps.data as InputNumberData
			content = <Form.NumberInput data-tip={data?.tooltip} data-for={data?.id} {...props} />
			break
		case 'text-field':
			props = inputProps.props as TextAreaProps
			data = inputProps.data as TextAreaData
			content = <Form.TextArea data-tip={data?.tooltip} data-for={data?.id} {...props} />
			break
		case 'file':
			content = (
				<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
					{({ getRootProps, getInputProps }) => (
						<section className="container" style={{ borderWidth: 1, borderColor: 'red' }}>
							<div {...getRootProps({ className: 'dropzone' })}>
								<input {...getInputProps()} />
								<p>Drag & drop some files here, or click to select files</p>
							</div>
							<aside>
								<h4>Files</h4>
								{/* <ul>{files}</ul> */}
							</aside>
						</section>
					)}
				</Dropzone>
			)
			break
		default:
			break
	}

	return (
		<div className="margin-bottom-lg">
			<div className="text text-base contrast-color-70 margin-bottom-xs">{label}</div>
			{content}
			<ReactTooltip
				id={data?.id}
				arrowColor="#3B4B89"
				multiline
				className={styles.tooltip}
				effect="solid"
				place="right"
				offset={{ right: 20 }}
			/>
		</div>
	)
}

export default FormItem
