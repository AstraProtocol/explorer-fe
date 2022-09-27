import styles from './style.module.scss'

type RowLoaderProps = {
	row?: number
}

export default function RowLoader({ row = 1 }: RowLoaderProps) {
	return (
		<table className={styles.table}>
			<tbody>
				{new Array(row).fill(0).map(_ => (
					<tr>
						<td className="td-1">
							<span></span>
						</td>
						<td className="td-2">
							<span></span>
						</td>
						<td className="td-3">
							<span></span>
						</td>
						<td className="td-4"></td>
						{/* <td className="td-5">
							<span></span>
						</td> */}
					</tr>
				))}
			</tbody>
		</table>
	)
}
