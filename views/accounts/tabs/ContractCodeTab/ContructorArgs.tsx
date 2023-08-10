import AutoLanguageView from 'components/CodeView/AutoView'
import { useMemo } from 'react'
import Web3 from 'web3'

interface DecodeArgItem {
	name: string
	data: string
	type: string
}

interface Props {
	constructorArgument: string
	abi: string
}

const getData = (type, data) => {
	if (type === 'address') return `0x${data}`
	return data
}

const ContractConstructorArguments = ({ abi, constructorArgument }: Props) => {
	const code = useMemo(() => {
		const abiJson = JSON.parse(abi)
		const contractConstructor = abiJson.find(item => item.type === 'constructor')
		const decodeArgsInput = contractConstructor.inputs
		const decodeArgsType: string[] = decodeArgsInput.map(item => item.type)
		const web3 = new Web3()
		const decodeArgs = web3.eth.abi.decodeParameters(decodeArgsType, constructorArgument)
		const result = `${constructorArgument}
		
${decodeArgsType.map(
	(d: string, index: number) => `Arg [${index}] (${d}): ${getData(d, decodeArgs[index])} (${
		decodeArgsInput[index].name
	})
`
)}`.replaceAll(',', '')
		return result
	}, [abi, constructorArgument])

	if (!abi || !constructorArgument) return null
	return (
		<div className="margin-bottom-xl">
			<AutoLanguageView code={code} filename="Constructor Arguments" />
		</div>
	)
}
export default ContractConstructorArguments
