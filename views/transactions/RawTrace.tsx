import { CopyBlock, dracula } from 'react-code-blocks'

type RawTraceProps = {
	text?: string
}
export default function RawTrace({ text }: RawTraceProps) {
	return (
		<div className="margin-left-lg margin-right-lg">
			<CopyBlock language={'json'} text={text} showLineNumbers theme={dracula} wrapLines={true} codeBlock />
		</div>
	)
}
