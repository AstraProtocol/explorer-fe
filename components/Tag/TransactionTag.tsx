import Tag, { TagType } from '../Tag'
import styles from './style.module.scss'

type TransactionTagProps = {
	type: string
}
export default function TransactionTag({ type }: TransactionTagProps) {
	if (!type) return ''
	
	const tagType: TagType = type === 'IN' ? 'success' : type === 'OUT' ? 'error' : 'primary'

	return (
		<div className="margin-top-xs flex">
			<Tag type={tagType} text={type} classes={styles.minWidth} />
		</div>
	)
}
