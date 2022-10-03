import clsx from 'clsx'

type Column = {
	title: string
	col: string
}

type RowTitleProps = {
	columns: Column[]
	classes?: string
}

export default function RowTitle({ columns, classes }: RowTitleProps) {
	return (
		<div className={clsx('row contrast-color-50 margin-bottom-sm margin-top-xl', classes)}>
			{columns.map(column => (
				<div className={`${column.col}`} key={column.title}>
					{column.title}
				</div>
			))}
		</div>
	)
}
