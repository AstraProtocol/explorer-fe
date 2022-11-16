import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'

/**
 * @param label
 * @param inputInfo: Caption text, description, error notification
 * * icon: font icon
 * * type: default normal
 *
 */
export interface TextAreaProps
	extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	label?: React.ReactNode
	inputInfo?: {
		icon?: string
		text: React.ReactNode
		type?: 'error' | 'normal'
	}
	statusType?: 'error' | 'normal'
	classes?: {
		wapper?: string
		label?: string
		inputFont?: string
		inputWrapperPadding?: string
	}
}
export default function TextArea({
	label,
	statusType,
	classes,
	inputInfo,
	disabled,
	readOnly,
	onChange,
	...rest
}: TextAreaProps) {
	const [_focus, _setFocus] = useState(false)
	const inputWrapperRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (inputWrapperRef) {
			inputWrapperRef.current?.addEventListener('focusin', _focusin, true)
			inputWrapperRef.current?.addEventListener('focusout', _focusout, true)
		}
		return () => {
			if (inputWrapperRef) {
				inputWrapperRef.current?.removeEventListener('focusin', _focusin)
				inputWrapperRef.current?.removeEventListener('focusout', _focusout)
			}
		}
	}, [inputWrapperRef])

	const _focusin = () => {
		_setFocus(true)
	}
	const _focusout = () => {
		_setFocus(false)
	}

	return (
		<div className={clsx(classes?.wapper, 'flex flex-column margin-bottom-md')}>
			{label ? (
				<span className={classes?.label || 'text text-base contrast-color-70 padding-bottom-xs work-break-all'}>
					{label}
				</span>
			) : null}
			<textarea
				{...rest}
				onChange={onChange}
				disabled={disabled}
				readOnly={readOnly}
				ref={inputWrapperRef}
				className={clsx(
					styles.textAreaWrapper,
					'width-100 flex',
					'contrast-bg-color-10',
					'contrast-color-100',
					classes?.inputWrapperPadding || 'padding-left-sm padding-right-sm padding-top-xs padding-bottom-xs',
					'radius-lg',
					'border border-base',
					'width-100',
					'text text-base',
					{
						[styles.inputError]: statusType === 'error',
						[styles.inputDisabled]: disabled,
						[styles.focus]: !disabled && _focus
					}
				)}
			/>
			{inputInfo ? (
				<div
					className={clsx('text text-base margin-top-xs word-break-all', {
						'contrast-color-70': inputInfo.type !== 'error',
						'alert-color-error': inputInfo.type === 'error'
					})}
				>
					{inputInfo.icon ? <span className={clsx(inputInfo.icon, 'margin-right-xs')}></span> : null}
					<span>{inputInfo.text}</span>
				</div>
			) : null}
		</div>
	)
}
