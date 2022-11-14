import { decodeConstructorArgs } from 'canoe-solidity'
import AutoLanguageView from 'components/CodeView/AutoView'

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
	if (!abi || !constructorArgument) return
	const decodeArgs = decodeConstructorArgs(JSON.parse(abi), constructorArgument)
	const code = `
    ${constructorArgument}
    
    ${decodeArgs.map(
		(d: DecodeArgItem, index: number) => `Arg [${index}] (${d.type}): ${getData(d.type, d.data)} ${
			d.name ? `(${d.name})` : ''
		}
    `
	)}`.replaceAll(',', '')
	return (
		<div className="margin-bottom-xl">
			<AutoLanguageView code={code} filename="Constructor Arguments" />
		</div>
	)
}
export default ContractConstructorArguments
