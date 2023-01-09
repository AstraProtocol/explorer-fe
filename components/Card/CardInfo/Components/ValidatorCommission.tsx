import Tabs from 'components/Tabs/Tabs'

type ValidatorCommissionProps = {
	commission?: CommissionRates
}

export default function ValidatorCommission({ commission }: ValidatorCommissionProps) {
	return (
		<div style={{ maxWidth: '885px', maxHeight: '200px', overflowY: 'auto' }}>
			<Tabs
				tabs={[
					{ title: 'Rate', id: 'rate', padding: ' ' },
					{ title: 'Max Rate', id: 'maxRate', padding: ' ' },
					{ title: 'Max Chane Rate', id: 'maxChangeRate', padding: ' ' }
				]}
				contents={{
					rate: <span className="text text-base">{commission?.rate}</span>,
					maxRate: <span className="text text-base">{commission?.maxRate}</span>,
					maxChangeRate: <span className="text text-base">{commission?.maxChangeRate}</span>
				}}
				classes="padding-top-xs"
				headerBorder={false}
				headerPadding=" "
			/>
		</div>
	)
}
