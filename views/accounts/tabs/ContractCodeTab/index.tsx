import JsonView from 'components/CodeView/JsonView'
import SolidityView from 'components/CodeView/SolidityView'
import Row from 'components/Grid/Row'
import useContractCode from 'views/accounts/hook/useContractCode'
import ContractConstructorArguments from './ContructorArgs'
import ContractCodeOverview from './Overview'

interface Props {
	address: string
}

const ContractCodeTab = ({ address }: Props) => {
	const contractCode = useContractCode(address)

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl">Contract Code</span>
				<></>
			</Row>

			{contractCode && (
				<div className="margin-left-xl margin-right-xl">
					<ContractCodeOverview contractCode={contractCode} />
					<ContractConstructorArguments
						abi={contractCode.ABI}
						constructorArgument={contractCode.ConstructorArguments}
					/>
					{contractCode.AdditionalSources.map((v: ContractFile) => (
						<SolidityView code={v.SourceCode} filename={v.Filename} key={v.Filename} />
					))}
					<JsonView filename="Contract ABI" code={contractCode.ABI} />
					{/* <SolidityView filename="Contract Creation Code" code={contractCode.Cre} />
				<SolidityView filename="Deployed ByteCode" code={contractCode.ABI} /> */}
				</div>
			)}
		</div>
	)
}

export default ContractCodeTab
