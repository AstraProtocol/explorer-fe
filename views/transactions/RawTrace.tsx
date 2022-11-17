import JsonView from 'components/CodeView/JsonView'

type RawTraceProps = {
	text?: string
}
export default function RawTrace({ text }: RawTraceProps) {
	return (
		<div className="margin-left-lg margin-right-lg">
			<JsonView filename="Raw Trace" code={text} />
		</div>
	)
}
