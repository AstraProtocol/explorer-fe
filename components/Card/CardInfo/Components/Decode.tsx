import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import Table from 'components/Table/Table'
import { isString } from 'lodash'
import styles from '../style.module.scss'

export interface EventDecode {
	name: string
	type: string
	value: string | string[]
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
						render: value => (
							<span className={clsx('money money-sm', styles.primaryColor)}>{value || '...'}</span>
						)
					}
				]}
				rows={[{ method: methodId, call }]}
				inverted
				classes={{ wapper: styles.table }}
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
						render: values => {
							let valueCopy = values
							let valueTitle = values
							// array params
							if (isString(values) && (values as string).includes('[')) {
								const data: string[] = JSON.parse(values)
								valueTitle = (
									<span>
										[<br />{' '}
										{data.map((val, index) => (
											<span key={val + index} className="padding-left-xs">
												{val}
												{index < values.length ? (
													<>
														, <br />{' '}
													</>
												) : null}
											</span>
										))}
										]
									</span>
								)
							}
							return (
								<CopyButton
									textCopy={valueCopy as string}
									textTitle={valueTitle as string}
									textColor={styles.copyColor}
								/>
							)
						}
					}
				]}
				rows={(items as any[]) || []}
				classes={{ wapper: styles.table }}
			/>
		</div>
	)
}
