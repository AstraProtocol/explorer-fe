import { Footer, ToastWrapper } from '@astraprotocol/astra-ui'
import API_LIST from 'api/api_list'
import clsx from 'clsx'
import React, { ReactNode, useEffect } from 'react'
import { setAstraSummary, setValidatorSummary } from 'slices/commonSlice'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { selectTheme } from '../slices/themeSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import styles from './Layout.module.scss'
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
	const { data: validatorSummaryRaw } = useSWRImmutable<ValidatorResponse>(_fetchCondition('validator'), {
		refreshInterval: 60000
	})
	const validatorSummary = getValidatorSummary(validatorSummaryRaw)
	const marketPrice = getMarketPriceData(marketPriceDataRaw)

	useEffect(() => {
		if (marketPrice) dispatch(setAstraSummary(marketPrice))
	}, [marketPrice])

	useEffect(() => {
		if (validatorSummary) dispatch(setValidatorSummary(validatorSummary))
	}, [validatorSummary])

	return (
		<div className={clsx(theme, styles.layoutContainer)}>
			<Navbar />
			<div className={styles.layout}>{props.children}</div>
			<Footer />
			<div id="modal-root"></div>
			<ToastWrapper />
		</div>
	)
}

export default Layout
