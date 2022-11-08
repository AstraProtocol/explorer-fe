import Row from 'components/Grid/Row'

interface Props {
	address: string
}

const ContractCodeTab = ({ address }: Props) => {
	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Contract Code</span>
				<></>
			</Row>
		</div>
	)
}

export default ContractCodeTab
