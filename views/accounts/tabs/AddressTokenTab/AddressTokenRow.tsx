import { Pair, Token } from '@solarswap/sdk'
import clsx from 'clsx'
import Row from 'components/Grid/Row'
import { LinkText } from 'components/Typography/LinkText'
import { useMemo } from 'react'
import { useGetTokenPriceQuery } from 'store/token'
import { CHAIN_ID, WASA_TOKEN } from 'utils/constants'
import { LinkMaker, convertBalanceToView, ellipseBetweenText, isERC721, isWASA } from 'utils/helper'
import styles from './style.module.scss'

interface Props {
	data: AddressToken
}

const AddressTokenRow = ({ data }: Props) => {
	const isNFT = isERC721(data.type)
	const isWASAToken = isWASA(data.contractAddress)

	const pairWASA = useMemo(() => {
		if (isWASAToken) return ''

		const tokenA = new Token(CHAIN_ID, data.contractAddress, 18, data.symbol, data.name)
		const pair = Pair.getAddress(tokenA, WASA_TOKEN)
		return pair
	}, [data, isWASAToken])

	const { data: tokenPriceData, isLoading } = useGetTokenPriceQuery({ pair: pairWASA }, { skip: isWASAToken })
	const pairASAPrice = isWASAToken ? 1 : tokenPriceData?.result?.price

	return (
		<Row
			classes={clsx(
				'text text-base padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm border border-bottom-base'
			)}
		>
			<div className={clsx('col-2 margin-right-xs', styles.colSymbol)}>
				<LinkText href={'#'}>{data.symbol}</LinkText>
			</div>
			<div className={clsx('col-1 margin-right-xs', styles.colType)}>
				<span>{data.type}</span>
			</div>
			<div className={clsx('col-2 margin-right-xs', styles.colSymbol)}>
				<span>{data.symbol}</span>
			</div>
			<div className={clsx('col-2 margin-right-xs', styles.colAmount)}>
				<span>{isNFT ? data.balance : convertBalanceToView(data.balance)}</span>
			</div>
			<div className={clsx('col-2', styles.colPrice)}>
				<span>{pairASAPrice}</span>
			</div>
			{/* <div className={clsx('col-1', styles.colValue)}>
				<span></span>
			</div> */}
			<div className={clsx('col-3', styles.colAddress)}>
				<LinkText href={LinkMaker.token(data.contractAddress)}>
					{data.name} ({ellipseBetweenText(data.contractAddress)})
				</LinkText>
			</div>
		</Row>
	)
}

export default AddressTokenRow
