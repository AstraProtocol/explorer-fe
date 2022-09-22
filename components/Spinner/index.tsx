import styles from './style.module.scss'

type SpinnerType = 'sm' | 'md' | 'lg'

type SpinnerProps = {
	size?: SpinnerType
}

const spinnerSizes = {
	sm: {
		container: {
			width: '22px',
			height: '22px',
			borderWidth: '3px',
			borderLeftWidth: '3px'
		},
		circle: {
			width: '6px',
			height: '6px',
            top: "-3px",
            left: "0px"
		}
	},
	md: {
		container: {
			width: '35px',
			height: '35px',
			borderWidth: '6px',
			borderLeftWidth: '6px'
		},
		circle: {
			width: '8px',
			height: '8px',
            borderWidth: "1px",
            top: "-3px",
            left: "-2px"
		}
	},
	lg: {
		container: {
			width: '50px',
			height: '50px',
			borderWidth: '12px',
			borderLeftWidth: '12px',
		},
		circle: {
			width: '14px',
			height: '14px',
            borderWidth: "2px",
            top: "-9px",
            left: "-6px"
		}
	}
}

export default function Spinner({ size = 'sm' }: SpinnerProps) {
	const spinnerSize = spinnerSizes[size]
	const { container, circle } = spinnerSize
	return (
		<div className={styles.loader} style={{ ...container }}>
			<div
				className={styles.circle}
				style={{
					...circle
				}}
			></div>
		</div>
	)
}
