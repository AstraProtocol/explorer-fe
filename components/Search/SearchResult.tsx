import clsx from 'clsx'
import Image from 'next/image'
import { SearchItem, SearchStatusEnum } from './SearchModal'
import styles from './style.module.scss'

type SearchResultProps = {
	status: SearchStatusEnum
	items?: SearchItem[]
}

export default function SearchResult({ status, items }: SearchResultProps) {
	return (
		<div className={styles.searchResult}>
			{status === SearchStatusEnum.INPUTTING && (
				<div className={styles.waitResult}>
					Enter address, token symbol name, transaction hash, or block number
				</div>
			)}
			{status === SearchStatusEnum.SEARCHING && <div className={styles.waitResult}>Searching for result...</div>}
			{status === SearchStatusEnum.DONE && (!items || items.length === 0) && (
				<div className={styles.waitResult}>
					<span style={{ paddingTop: '26px' }}>
						<Image src={'/images/icons/empty_search.png'} width={164} height={97} />
					</span>
					Sorry! We could not find any results
				</div>
			)}
			{status === SearchStatusEnum.DONE && items?.length > 0 && (
				<div className={clsx(styles.searchResultList, "padding-top-lg")}>
					<div className='text-base padding-bottom-sm margin-bottom-sm'>{items.length} search result:</div>
					{items.map(({ label, time }) => (
						<div key={label} className={clsx(styles.item, "money money-sm padding-left-xs")}>
							<div className={clsx("text-bold")}>{label}</div>
							<div>{time}</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
