import { Row } from '@astraprotocol/astra-ui'

type ChartHeaderProps = {
	text: string
}

export default function ChartHeader({ text }: ChartHeaderProps) {
	return (
		<Row>
			<h3 className="text text-xl padding-md contrast-bg-color-10 width-100 margin-bottom-md radius-base margin-top-xl">
				{text}
			</h3>
		</Row>
	)
}
