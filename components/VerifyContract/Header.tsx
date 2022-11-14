import clsx from 'clsx'
import CloseButton from 'components/Button/CloseButton'
import Row from 'components/Grid/Row'
import styles from './style.module.scss'

const Header = ({ onClose }) => (
	<Row
		style={{ justifyContent: 'space-between', flex: 0 }}
		classes={clsx(
			styles.paddingHoz,
			styles.borderColor,
			'padding-left-lg padding-right-lg padding-top-md padding-bottom-md '
		)}
	>
		<span className="text text-2xl contrast-color-100">Solidity Smart Contract Verification</span>
		<CloseButton onClose={onClose} />
	</Row>
)

export default Header
