import CopyButton from 'components/Button/CopyButton'
import Prism from 'prismjs'
import 'prismjs/components/prism-gettext'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import { useEffect } from 'react'

interface Props {
	code: string
	filename: string
}

const AutoLanguageView = ({ code, filename }: Props) => {
	useEffect(() => {
		Prism.highlightAll()
	}, [])
	return (
		<div className="margin-bottom-xl">
			<CopyButton textCopy={code} textTitle={filename} classes="margin-bottom-sm" />
			<pre className="line-numbers" style={{ maxHeight: 500 }}>
				<code className="language-gettext">{code}</code>
			</pre>
		</div>
	)
}

export default AutoLanguageView
