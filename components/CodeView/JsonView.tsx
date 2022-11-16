import CopyButton from 'components/Button/CopyButton'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import { useEffect } from 'react'

interface Props {
	code: string
	filename: string
}

const JsonView = ({ code, filename }: Props) => {
	useEffect(() => {
		Prism.highlightAll()
	}, [])
	return (
		<div className="margin-bottom-xl">
			<CopyButton textCopy={code} textTitle={filename} classes="margin-bottom-sm" />
			<pre style={{ maxHeight: 500 }}>
				<code className="language-json">{code}</code>
			</pre>
		</div>
	)
}

export default JsonView
