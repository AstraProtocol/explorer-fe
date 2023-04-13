import clsx from 'clsx'
import { LinkText } from 'components/Typography/LinkText'
import { LinkMaker } from 'utils/helper'
import styles from '../style.module.scss'

interface Props {
	addressData: Address
	address: string
}

const ContractOverview = ({ addressData, address }: Props) => {
	return (
		<div style={{ justifyContent: 'space-between' }} className={clsx('padding-bottom-lg ')}>
			{addressData.tokenSymbol && (
				<div className={clsx(styles.borderBottom, 'row padding-bottom-sm padding-top-sm')}>
					<span className="col-2 text text-base contrast-color-50">Token</span>
					<LinkText classes="col-10" href={LinkMaker.token(address)}>
						{addressData.tokenName
							? `${addressData.tokenName} (${addressData.tokenSymbol})`
							: addressData.tokenSymbol}
					</LinkText>
				</div>
			)}
			<div className={clsx(styles.borderBottom, 'row padding-bottom-sm padding-top-sm')}>
				<span className="col-2 text text-base contrast-color-50">Owner</span>
				<LinkText classes="col-10" href={LinkMaker.address(addressData.creator)}>
					{addressData.creator}
				</LinkText>
			</div>
			<div className={clsx(styles.borderBottom, 'row padding-bottom-sm padding-top-sm')}>
				<span className="col-2 text text-base contrast-color-50">Creation Hash</span>
				<LinkText classes="col-10" href={LinkMaker.transaction(addressData.creationTransaction)}>
					{addressData.creationTransaction}
				</LinkText>
			</div>
			{addressData.implementationAddressHash && (
				<div className={clsx(styles.borderBottom, 'row padding-bottom-sm padding-top-sm')}>
					<span className="col-2 text text-base contrast-color-50">Implementation</span>
					<LinkText classes="col-10" href={LinkMaker.address(addressData.implementationAddressHash)}>
						{addressData.implementationAddressName
							? `${addressData.implementationAddressName} | ${addressData.implementationAddressHash}`
							: addressData.implementationAddressHash}
					</LinkText>
				</div>
			)}
		</div>
	)
}

export default ContractOverview
