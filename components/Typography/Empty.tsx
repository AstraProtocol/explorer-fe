import clsx from 'clsx'
import Image from 'next/image'

type EmptyProps = {
	text?: string
	classes?: string
}
export default function Empty({ text = 'Empty', classes = '' }: EmptyProps) {
	return (
		<div className={clsx('contrast-color-100 block-center', classes)} style={{ width: '100%' }}>
			<Image alt="Astra Blockchain" src={'/images/icons/empty_search.png'} width={164} height={97} />
			<span className="padding-bottom-md">{text}</span>
		</div>
	)
}
