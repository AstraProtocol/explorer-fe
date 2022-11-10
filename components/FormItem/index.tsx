import { Form, RadioButton } from '@astraprotocol/astra-ui'
import { InputProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Input'
import { InputProps as InputNumberProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Input/NumberInput'
import { TextAreaProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Input/TextArea'
import { SelectProps } from '@astraprotocol/astra-ui/lib/es/components/Form/Select'
import { RadioButtonProps } from '@astraprotocol/astra-ui/lib/es/components/RadioButton'

import Row from 'components/Grid/Row'

export interface Option {
	label: string
	value: string
}

export interface FormRadioButtonData {
	items: Option[]
	currentValue?: string | number
	onClick: Function
}

export interface FormSelectData {
	items: Option[]
	currentValue?: string | number
	onSelect: Function
}

interface Props {
	label: string
	type: 'input' | 'select' | 'radio-button' | 'text-field' | 'input-number'
	inputProps: {
		props?: InputProps | SelectProps | RadioButtonProps | TextAreaProps
		data?: FormRadioButtonData | FormSelectData | any
	}
}

const FormItem = ({ label, type, inputProps }: Props) => {
	let content
	let data
	switch (type) {
		case 'input':
			content = <Form.Input {...(inputProps.props as InputProps)} />
			break
		case 'radio-button':
			content = (
				<Row>
					{(inputProps.data as FormRadioButtonData).items.map((o: Option) => (
						<RadioButton
							{...(inputProps.props as RadioButtonProps)}
							text={o.label}
							value={o.value}
							key={o.value}
							onClick={() => inputProps.data.onClick(o.value)}
							checked={o.value === inputProps.data.currentValue}
							classes={{ other: 'margin-right-md' }}
						/>
					))}
				</Row>
			)
			break
		case 'select':
			data = inputProps.data as FormSelectData
			content = (
				<Form.Select
					onChange={value => data.onSelect(value)}
					options={data.items}
					{...(inputProps.props as SelectProps)}
				/>
			)
			break
		case 'input-number':
			content = <Form.NumberInput {...(inputProps.props as InputNumberProps)} />
			break
		case 'text-field':
			content = <Form.TextArea {...(inputProps.props as TextAreaProps)} />
			break
		default:
			break
	}

	return (
		<div className="margin-bottom-lg">
			<div className="text text-base same-color-70 margin-bottom-xs">{label}</div>
			{content}
		</div>
	)
}

export default FormItem
