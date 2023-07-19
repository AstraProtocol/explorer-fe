import { useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import Row from 'components/Grid/Row'
import styles from './style.module.scss'

interface Props {
	contractCode: ContractCodeData
}
const ContractCodeOverview = ({ contractCode }: Props) => {
	const { isMobile } = useMobileLayout()

	return (
		<div className={clsx(styles.overview, 'margin-bottom-xl ')}>
			<div className={isMobile ? 'col col-5' : 'col col-5 margin-right-xl'}>
				<Row style={{ justifyContent: 'space-between' }}>
					<span className="text text-sm contrast-color-30">Compiler Version: </span>
					<span className="text text-base contrast-color-100">{contractCode.CompilerVersion}</span>
				</Row>
				<Row style={{ justifyContent: 'space-between' }}>
					<span className="text text-sm contrast-color-30">EVM Version:</span>
					<span className="text text-base contrast-color-100">{contractCode.EVMVersion}</span>
				</Row>
			</div>
			<div className="col col-5">
				<Row style={{ justifyContent: 'space-between' }}>
					<span className="text text-sm contrast-color-30">Is Proxy:</span>
					<span className="text text-base contrast-color-100">{contractCode.IsProxy}</span>
				</Row>
				<Row style={{ justifyContent: 'space-between' }}>
					<span className="text text-sm contrast-color-30">Optimization enabled: </span>
					<span className="text text-base contrast-color-100">
						{contractCode.OptimizationUsed === 'true'
							? `Yes with ${contractCode.OptimizationRuns} runs`
							: 'No'}
					</span>
				</Row>
				{contractCode.Verified && (
					<Row style={{ justifyContent: 'space-between' }}>
						<span className="text text-sm contrast-color-30">Verified At: </span>
						<span className="text text-base contrast-color-100">{contractCode.VerifiedAt}</span>
					</Row>
				)}
			</div>
		</div>
	)
}
export default ContractCodeOverview
