import { Typography as TypographyUI, useMobileLayout } from '@astraprotocol/astra-ui'
import clsx from 'clsx'
import CopyButton from 'components/Button/CopyButton'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import { isUndefined } from 'lodash'
import numeral from 'numeral'
import { convertBalanceToView } from 'utils/helper'
import styles from './style.module.scss'

interface Props {
	token: string
	tokenData: Token
}

const TokenOverview = ({ token, tokenData }: Props) => {
	const { isMobile } = useMobileLayout()

	return (
		<BackgroundCard classes="padding-lg margin-top-2xl">
			<Row style={{ justifyContent: 'space-between' }} classes={clsx(styles.borderBottom, 'padding-bottom-lg')}>
				<div>
					<span className="text text-base contrast-color-50">Contract:</span>
					<br />
					<span className={clsx('text', 'text-lg')}>{token}</span>
				</div>
				<div>
					<CopyButton textCopy={token} />
				</div>
			</Row>
			<Row style={{ justifyContent: 'space-between' }} classes="md-wrap padding-top-lg">
				<div className="">
					<span className="text text-base contrast-color-50">Total Supply:</span>
					<br />
					<TypographyUI.Balance
						size="sm"
						currency={tokenData.symbol}
						value={tokenData.totalSupply ? convertBalanceToView(tokenData.totalSupply) : 'NaN'}
						fixNumber={5}
					/>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Token Name:</span>
					<br />
					<span className="text text-base">{tokenData.name}</span>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Holders:</span>
					<br />
					<span className="text text-base">
						{isUndefined(tokenData.holdersCount) ? 'NaN' : numeral(tokenData.holdersCount).format('0,0')}
					</span>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Transfers Count:</span>
					<br />
					<span className="text text-base">{numeral(tokenData.transfersCount || 0).format('0,0')}</span>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Token Type:</span>
					<br />
					<span className="text text-base">{tokenData.type}</span>
				</div>
				<div className="">
					<span className="text text-base contrast-color-50">Decimals:</span>
					<br />
					<span className="text text-base">{tokenData.decimals}</span>
				</div>
			</Row>
		</BackgroundCard>
	)
}

export default TokenOverview
