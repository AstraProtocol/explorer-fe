import { ModalWrapper, RadioButton } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import CloseButton from 'components/Button/CloseButton'
import Row from 'components/Grid/Row'
import { useState } from 'react'
import styles from './style.module.scss'

interface Props {
	open: boolean
	onClose: Function
	address: string
}

const ModalSelectVerify = ({ open, onClose, address = '' }: Props) => {
	const [option, setOption] = useState(undefined)

	return (
		<ModalWrapper open>
			<div className={clsx(styles.modalVerify, 'radius-lg')}>
				<Row
					style={{ justifyContent: 'space-between', flex: 0 }}
					classes={clsx(
						styles.container,
						'padding-left-lg padding-right-lg padding-top-md padding-bottom-md border border-bottom-base'
					)}
				>
					<span className="text text-2xl same-color-100">Solidity Smart Contract verification</span>
					<CloseButton onClose={onClose} />
				</Row>
				<div className={clsx(styles.container)}>
					<div className="contrast-bg-color-20 padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm">
						<div className="same-color-50 text text-base">Contract Address</div>
						<div className="same-color-100 money money-base">{address}</div>
					</div>
					<div className="margin-top-xl">
						<div className="text text-lg same-color-100 padding-bottom-xs">Verify Method</div>
						<Row style={{ justifyContent: 'space-between' }}>
							<RadioButton
								text="Via flattened source code"
								style={{ width: '100%' }}
								classes={{ other: 'margin-right-md' }}
								onClick={() => {
									console.log('Fuck')
									setOption('flattened-code')
								}}
								value="flattened-code"
								checked={option === 'flattened-code'}
							/>
							<RadioButton
								text="Via standard input JSON"
								style={{ width: '100%' }}
								onClick={() => setOption('standard-code')}
								value="standard-code"
								checked={option === 'standard-code'}
							/>
						</Row>
					</div>
				</div>
			</div>
		</ModalWrapper>
	)
}

export default ModalSelectVerify
