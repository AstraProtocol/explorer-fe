import clsx from 'clsx'

export default function Tag({ text }: { text: string }) {
	return (
		<div
			className={clsx(
				'arrow-right',
				'padding-left-xs padding-right-2xs',
				'radius-tl-sm radius-bl-sm',
				'contrast-bg-color-10',
				'text text-base contrast-color-50',
				'margin-left-sm'
			)}
		>
			{text}
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
