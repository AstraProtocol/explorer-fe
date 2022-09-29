type Column = {
	title: string
	col: string
}

type RowTitleProps = {
	columns: Column[]
}

export default function RowTitle({ columns }: RowTitleProps) {
	return (
		<div className="row contrast-color-50 margin-bottom-sm margin-top-xl">
			{columns.map(column => (
				<div className={`${column.col}`} key={column.title}>
					{column.title}
				</div>
			))}
		</div>
	)
}
