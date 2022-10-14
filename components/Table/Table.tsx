import clsx from 'clsx'
import styles from './style.module.scss'

/**
 * column-key: value
 */
export interface RowData {
	[key: string]: React.ReactNode
}

interface Props {
	rows: RowData[]
	id?: string
	inverted?: boolean
	colums: Column[]
	classes?: {
		wapper?: string
	}
}

export type RowRender = (value: React.ReactNode, index: number) => React.ReactNode

/**
 * @param key key of column
 * @param title title of column
 * @param render custom render function
 */
export interface Column {
	key: string
	title: React.ReactNode
	render?: RowRender
}

const Table = ({ rows, colums, inverted = false, id = 'table', classes = {} }: Props) => {
	const _defaultRender = (value: React.ReactNode, index: number, rowRender: RowRender) => {
		if (rowRender) {
			return rowRender(value, index)
		}
		return <span>{value}</span>
	}
	return (
		<div className={classes?.wapper}>
			<table className={clsx(styles.table, 'text text-base', { [styles.tableInverted]: inverted })}>
				<thead>
					<tr>
						{colums.map((cell: Column, index) => (
							<th
								key={cell.key}
								className={clsx('text-bold', {
									'radius-tl-sm': index === 0,
									'radius-tr-sm': !inverted && index === colums.length - 1,
									'radius-bl-sm': inverted && index === colums.length - 1
								})}
							>
								{cell.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, rowIdx) => (
						<tr key={`${id}-${rowIdx}`}>
							{colums.map((column: Column, colIdx) => (
								<td
									key={`${id}-${rowIdx}-${colIdx}`}
									className={clsx({
										'radius-bl-sm': !inverted && rowIdx === rows.length - 1 && colIdx === 0,
										'radius-br-sm': rowIdx === rows.length - 1 && colIdx === colums.length - 1,
										'radius-tr-sm': inverted && rowIdx === rows.length - 1 && colIdx === 0
									})}
								>
									{_defaultRender(row[column.key], rowIdx, column.render)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
