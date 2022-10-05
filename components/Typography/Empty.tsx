import Image from 'next/image'

export default function Empty() {
	return (
		<div className="contrast-color-100 block-center" style={{ width: '100%' }}>
			<Image alt="Astra Blockchain" src={'/images/icons/empty_search.png'} width={164} height={97} />
			<span className="padding-bottom-md">There are no transactions for this block.</span>
		</div>
	)
}
