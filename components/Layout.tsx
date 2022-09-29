import API_LIST from 'api/api_list'
import React, { ReactNode, useEffect } from 'react'
import { setAstraSummary, setValidatorSummary } from 'slices/commonSlice'
import useSWR from 'swr'
import { selectTheme } from '../slices/themeSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Footer from './Footer'
import Navbar from './Navbar'

type Props = {
	children: ReactNode
}

const getMarketPriceData = (data): AstraSummary => {
	return data?.ticker
}

const getValidatorSummary = (data): ValidatorData[] => {
	return data?.result
}

const Layout: React.FC<Props> = props => {
	const theme = useAppSelector(selectTheme)
	const dispatch = useAppDispatch()

	const _fetchCondition = (key: string) => {
		switch (key) {
			case 'market_price':
				return [API_LIST.MARKET_PRICE]
			case 'validator':
				return [API_LIST.VALIDATORS]
		}
	}
	const { data: marketPriceDataRaw } = useSWR<MarketPriceResponse>(_fetchCondition('market_price'))
	const { data: validatorSummaryRaw } = useSWR<ValidatorResponse>(_fetchCondition('validator'))
	const validatorSummary = getValidatorSummary(validatorSummaryRaw)
	const marketPrice = getMarketPriceData(marketPriceDataRaw)

	useEffect(() => {
		dispatch(setAstraSummary(marketPrice))
	}, [marketPrice])

	useEffect(() => {
		dispatch(setValidatorSummary(validatorSummary))
	}, [validatorSummary])

	return (
		<div className={theme} style={{ minHeight: '100vh' }}>
			<Navbar />
			<div className="layout">{props.children}</div>
			<Footer />
		</div>
	)
}

export default Layout
