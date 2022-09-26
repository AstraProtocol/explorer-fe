import clsx from 'clsx'
import styles from './style.module.scss'

interface Props {
	rowKey: string
	data: any[]
	title?: string
	inverted?: boolean
	dataSource: TableDataSource[]
}

export interface TableDataSource {
	key: string
	title: string
	dataIndex: string
	render: (value: any, object: any, index) => JSX.Element
}

const Table = ({ rowKey, title, data, dataSource, inverted = false }: Props) => {
	return (
		<table className={clsx(styles.table, inverted && styles.tableInverted)}>
			<caption>{title}</caption>
			<tr>
				{dataSource.map((d: TableDataSource) => (
					<th key={d.key}>{d.title}</th>
				))}
			</tr>
			{data.map((d: any, index: number) => (
				<tr key={d[rowKey]}>
					{dataSource.map((k: TableDataSource) => (
						<td key={`${rowKey}-${d[rowKey]}-${k.key}`}>{k.render(d[k.dataIndex], d, index)}</td>
					))}
				</tr>
			))}
		</table>
	)
}

export default Table
