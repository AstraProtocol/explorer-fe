import clsx from 'clsx'

export type LabelTypes = 'unset' | 'success' | 'error'
export type LabelBackgroundTypes = 'unset' | 'rectangle' | 'specialShape'

type LabelProps = {
	type?: LabelTypes
	icon?: boolean
	text: string
	color?: string
	background?: LabelBackgroundTypes
}

export function Label({ type, text, color, background, icon }: LabelProps) {
	return (
		<span
			className={clsx('label money money-sm radius-sm', 'padding-left-xs padding-right-xs', {
				'alert-color-error': type === 'error',
				'bg-error': type === 'error' && background !== 'unset',
				'alert-color-success': type === 'success',
				'bg-success': type === 'success' && background !== 'unset',
				'pointer contrast-color-70': background === 'specialShape'
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
			{text}
			<style jsx>{`
				.label {
					display: inline-flex;
					position: relative;
					font-weight: 400;
				}
				.bg-success {
					background-color: rgba(var(--alert-color--success-raw), 0.24);
				}

				.bg-error {
					background: rgba(var(--alert-color--error-raw), 0.24);
				}
				.bg-normal {
					background: rgba(var(--alert-color--success-raw), 0.24);
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
