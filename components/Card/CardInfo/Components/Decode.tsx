import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import Table from 'components/Table/Table'
import styles from '../style.module.scss'

export interface EventDecode {
	name: string
	type: string
	value: string
	indexed?: boolean
}

export type DecodeProps = {
	methodId: string
	call: string
	items: EventDecode[]
}

export default function Decode({ methodId, call, items }: DecodeProps) {
	return (
		<div>
			<Table
				id="method"
				colums={[
					{
						title: 'Method Id',
						key: 'method',
						render: value => (
							<span className={clsx('money money-sm', styles.primaryColor)}>{value || '0x'}</span>
						)
					},
					{
						title: 'Call',
						key: 'call',
						render: value => <span className={clsx('money money-sm', styles.primaryColor)}>{value}</span>
					}
				]}
				rows={[{ method: methodId, call }]}
				inverted
			/>
			<div className="margin-bottom-xs" />
			<Table
				id="param"
				colums={[
					{
						title: 'Name',
						key: 'name',
						render: value => <span className="text text-sm contrast-color-70">{value}</span>
					},
					{
						title: 'Type',
						key: 'type',
						render: value => <span className="text text-sm contrast-color-70">{value}</span>
					},
					{
						title: 'Indexed?',
						key: 'indexed',
						render: value => (
							<span className={clsx('money money-sm', styles.primaryColor)}>
								{value ? 'true' : 'false'}
							</span>
						)
					},
					{
						title: 'Data',
						key: 'value',
						render: value => (
							<CopyButton
								textCopy={value as string}
								textTitle={value as string}
								textColor={styles.copyColor}
							/>
						)
					}
				]}
				rows={items}
			/>
		</div>
	)
}
