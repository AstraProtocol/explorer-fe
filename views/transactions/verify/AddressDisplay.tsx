import clsx from 'clsx'

const AddressDisplay = ({ address, classes = '' }) => (
	<div
		className={clsx(
			'same-bg-color-20 padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm radius-lg',
			classes
		)}
	>
		<div className="contrast-color-50 text text-base">Contract Address</div>
		<div className="contrast-color-100 money money-sm">{address}</div>
	</div>
)

export default AddressDisplay
