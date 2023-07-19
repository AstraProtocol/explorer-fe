import clsx from 'clsx'

interface Props {
	text: string
	fontType?: 'Titi' | 'Manrope'
	hasArrowRight?: boolean
	ellipsis?: boolean
}

export default function PolygonTag({ text, fontType = 'Manrope', hasArrowRight = true, ellipsis }: Props) {
	return (
		<div
			className={clsx(
				'padding-left-xs ',
				'contrast-bg-color-10 margin-left-sm',
				hasArrowRight
					? 'margin-left-sm arrow-right radius-tl-sm radius-bl-sm padding-right-2xs'
					: 'radius-sm padding-right-xs',
				fontType == 'Manrope' && 'text text-base contrast-color-50',
				fontType == 'Titi' && 'money money-2xs contrast-color-50',
				{ ['text-ellipsis']: ellipsis }
			)}
			style={ellipsis && { maxWidth: 100, overflow: 'clip' }}
		>
			<span title={text}>{text}</span>
			<style jsx>{`
				.arrow-right {
					position: relative;
					display: inline-flex;
				}
				.arrow-right::after {
					content: '';
					position: absolute;
					right: -10px;
					top: 0;
					width: 0;
					height: 0;
					border-top: 12px solid transparent;
					border-bottom: 12px solid transparent;

					border-left: 10px solid var(--contrast-color-theme-10);
				}
			`}</style>
		</div>
	)
}
