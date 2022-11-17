import CopyButton from 'components/Button/CopyButton'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import { useEffect } from 'react'

interface Props {
	code: string
	filename: string
}

const JsonView = ({ code, filename }: Props) => {
	useEffect(() => {
		Prism.highlightAll()
	}, [code])
	return (
		<div className="margin-bottom-xl">
			<CopyButton textCopy={code} textTitle={filename} classes="margin-bottom-sm" />
			<pre className="line-numbers" style={{ maxHeight: 500 }}>
				<code className="language-json">{code}</code>
			</pre>
		</div>
	)
}

export default JsonView
