import clsx from 'clsx'
import styles from './style.module.scss'

interface Props {
	contractCode: ContractCodeData
}
const ContractCodeOverview = ({ contractCode }: Props) => {
	return (
		<div className={clsx(styles.overview, 'margin-bottom-xl')}>
			<div className="text text-sm contrast-color-30">
				Contract Name: <div className="text text-base contrast-color-100">{contractCode.ContractName}</div>
			</div>
			<div className="text text-sm contrast-color-30">
				Compiler Version:{' '}
				<div className="text text-base contrast-color-100">{contractCode.CompilerVersion}</div>
			</div>
			<div className="text text-sm contrast-color-30">
				Optimization enabled:{' '}
				<div className="text text-base contrast-color-100">{contractCode.OptimizationUsed}</div>
			</div>
			<div className="text text-sm contrast-color-30">
				Optimization runs:{' '}
				<div className="text text-base contrast-color-100">{contractCode.OptimizationRuns}</div>
			</div>
		</div>
	)
}
export default ContractCodeOverview
