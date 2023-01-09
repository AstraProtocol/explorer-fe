import Tabs from 'components/Tabs/Tabs'

type ValidatorDescriptionProps = {
	description?: ValidatorData
}

export default function ValidatorDescription({ description }: ValidatorDescriptionProps) {
	return (
		<div style={{ maxWidth: '885px', maxHeight: '200px', overflowY: 'auto' }}>
			<Tabs
				tabs={[
					{ title: 'Moniker', id: 'moniker', padding: ' ' },
					{ title: 'Identity', id: 'identity', padding: ' ' },
					{ title: 'Website', id: 'website', padding: ' ' },
					{ title: 'Security Contact', id: 'securityContact', padding: ' ' },
					{ title: 'Details', id: 'details', padding: ' ' }
				]}
				contents={{
					moniker: <span className="text text-base">{description?.moniker}</span>,
					identity: <span className="text text-base">{description?.identity}</span>,
					website: <span className="text text-base">{description?.website}</span>,
					securityContact: <span className="text text-base">{description?.securityContact}</span>,
					details: <span className="text text-base">{description?.details}</span>
				}}
				classes="padding-top-xs"
				headerBorder={false}
				headerPadding=" "
			/>
		</div>
	)
}
