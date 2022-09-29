import Row from 'components/Grid/Row'
import BackgroundCard from '../Background/BackgroundCard'
import styles from './style.module.scss'
interface ItemComponent {
	label: string
	content: JSX.Element | string
}

interface Props {
	items: ItemComponent[]
}

const ItemsCard = ({ items }: Props) => {
	return (
		<BackgroundCard>
			{items.map((item: ItemComponent) => (
				<Row key={item.label}>
					<div className={styles.cardLabel}>{item.label}</div>
					<div className={styles.cardContent}>{item.content}</div>
				</Row>
			))}
		</BackgroundCard>
	)
}

export default ItemsCard
