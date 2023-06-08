import { Table } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
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
						content: 'Method Id',
						key: 'method',
						render: value => (
							<span className={clsx('money money-sm', styles.primaryColor)}>{value || '0x'}</span>
						)
					},
					{
						content: 'Call',
						key: 'call',
						render: value => (
							<span className={clsx('money money-sm', styles.primaryColor)}>{value || '...'}</span>
						)
					}
				]}
				rows={[{ method: { content: methodId }, call: { content: call } }]}
				classes={{ wapper: styles.table }}
			/>
			<div className="margin-bottom-xs" />
			<Table
				id="param"
				colums={[
					{
						content: 'Name',
						key: 'name',
						render: value => <span className="text text-sm contrast-color-70">{value}</span>
					},
					{
						content: 'Type',
						key: 'type',
						render: value => <span className="text text-sm contrast-color-70">{value}</span>
					},
					{
						content: 'Indexed?',
						key: 'indexed',
						render: value => (
							<span className={clsx('money money-sm', styles.primaryColor)}>
								{value ? 'true' : 'false'}
							</span>
						)
					},
					{
						content: 'Data',
						key: 'value',
						render: values => {
							let valueCopy = values
							let valueTitle = values
							// array params
							if (isString(values) && (values as string).includes('[')) {
								try {
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
								} catch (err) {
									// If data is not JSON data, display raw data
									valueTitle = values
								}
								
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
				rows={
					items?.map(item => ({
						indexed: { content: item.indexed },
						name: { content: item.name },
						type: { content: item.type },
						value: { content: item.value }
					})) || []
				}
				classes={{ wapper: styles.table }}
			/>
		</div>
	)
}
