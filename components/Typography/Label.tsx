import clsx from 'clsx'

export type LabelTypes = 'unset' | 'success' | 'error'
export type LabelBackgroundTypes = 'unset' | 'rectangle' | 'specialShape'

/**
 * @type LabelTypes
 * @icon show or hide. follow the type of label
 * @color css color
 * @raidus css radius
 * @backgroundShape LabelBackgroundTypes default value is unset
 * @padding css padding
 */
type LabelProps = {
	type?: LabelTypes
	icon?: boolean
	text: string
	titleText?: string
	color?: string
	radius?: string
	backgroundShape?: LabelBackgroundTypes
	padding?: string
	font?: string
}

export function Label({
	type = 'unset',
	text,
	titleText,
	color,
	backgroundShape = 'unset',
	icon,
	radius,
	padding,
	font
}: LabelProps) {
	return (
		<span
			className={clsx('label', font || 'money-sm money', padding || 'padding-right-xs', radius || 'radius-sm', {
				// color
				'alert-color-error ': type === 'error',
				'alert-color-success': type === 'success',
				[color]: type === 'unset',
				// background
				'bg-error': type === 'error' && backgroundShape !== 'unset',
				'bg-success': type === 'success' && backgroundShape !== 'unset',
				'contrast-bg-color-10': type === 'unset' && backgroundShape === 'rectangle',
				'pointer contrast-color-70': backgroundShape === 'specialShape',
				'padding-left-xs': backgroundShape !== 'unset'
			})}
		>
			{icon && (
				<span
					className={clsx({
						'checked-icon padding-right-xs ': icon,
						'alert-color-error': type === 'error',
						'alert-color-success': type === 'success'
					})}
				/>
			)}
			<span title={titleText}>{text}</span>
			<style jsx>{`
				.label {
					display: inline-flex;
					position: relative;
				}
				.bg-success {
					background-color: rgba(var(--alert-color--success-raw), 0.24);
				}

				.bg-error {
					background: rgba(var(--alert-color--error-raw), 0.24);
				}

				.pointer {
					background: rgba(var(--contrast-color-theme--raw), 0.1);
					border-radius: 0px 8px 8px 0px;
					padding-left: var(--offset-md);
					clip-path: polygon(100%0%, 100%50%, 100%100%, 0%100%, 5%50%, 0%0%);
				}

				.separate {
					border-left: 1.4px solid rgba(255, 255, 255, 0.1);
				}
			`}</style>
		</span>
	)
}
