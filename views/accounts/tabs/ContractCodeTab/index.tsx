import { NormalButton, Spinner } from '@astraprotocol/astra-ui'
import JsonView from 'components/CodeView/JsonView'
import SolidityView from 'components/CodeView/SolidityView'
import Row from 'components/Grid/Row'
import { LinkText } from 'components/Typography/LinkText'
import ModalContractVerify from 'components/VerifyContract'
import { useState } from 'react'
import { LinkMaker } from 'utils/helper'
import useContractCode from 'views/accounts/hook/useContractCode'
import ContractConstructorArguments from './ContructorArgs'
import ContractCodeOverview from './Overview'

interface Props {
	address: string
}

const VerifiedAlert = contractCode => (
	<div className="text text-sm contrast-color-30 margin-bottom-md">
		Contract is not verified.{' '}
		{contractCode.SameBytecodeAddress && (
			<>
				However, we found a verified contract with the same bytecode{' '}
				<LinkText href={LinkMaker.address(contractCode.SameBytecodeAddress)}>
					{contractCode.SameBytecodeAddress}
				</LinkText>
				.{' '}
			</>
		)}
		In order to verify this contract, click Verify & Publish button.
	</div>
)

const ContractCodeTab = ({ address }: Props) => {
	const { contractCode, mutate, isValidating } = useContractCode(address)
	const [verifyVisible, setVerifiVisible] = useState(false)

	const onShowVerify = () => {
		setVerifiVisible(true)
	}
	const onVerifyDone = () => {
		mutate()
		setVerifiVisible(false)
	}
	

	return (
		<div>
			<Row style={{ justifyContent: 'space-between' }} classes="padding-xl">
				<span className="text text-xl contrast-color-100">
					<span className="text text-xl contrast-color-100">
						{contractCode?.ContractName || 'Contract Code'}
					</span>
				</span>
				{!contractCode?.Verified && <NormalButton onClick={onShowVerify}>Verify & Publish</NormalButton>}
			</Row>
			{isValidating ? (
				<div className="margin-xl">
					<Spinner size="md" />
				</div>
			) : contractCode ? (
				<div className="margin-left-xl margin-right-xl">
					{!contractCode?.Verified && <VerifiedAlert contractCode={contractCode} />}
					<ContractCodeOverview contractCode={contractCode} />
					<ContractConstructorArguments
						abi={contractCode.ABI}
						constructorArgument={contractCode.ConstructorArguments}
					/>
					<SolidityView code={contractCode.SourceCode} filename="Contract Source Code" />
					{contractCode.AdditionalSources?.map((v: ContractFile) => (
						<SolidityView code={v.SourceCode} filename={v.Filename} key={v.Filename} />
					))}
					<JsonView filename="Contract ABI" code={contractCode.ABI} />
					{/* <SolidityView filename="Contract Creation Code" code={contractCode.ContractCreationCode} /> */}
					<SolidityView filename="Deployed ByteCode" code={contractCode.DeployedByteCode} />
				</div>
			) : (
				<div className="padding-xl">
					<span className="text text-xl contrast-color-30">API error. Something went wrong</span>
				</div>
			)}
			<ModalContractVerify
				onSuccess={onVerifyDone}
				onClose={onVerifyDone}
				address={address}
				open={verifyVisible}
			/>
		</div>
	)
}

export default ContractCodeTab
