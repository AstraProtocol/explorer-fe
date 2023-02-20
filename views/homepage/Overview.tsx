import { useMobileLayout } from '@astraprotocol/astra-ui'
import API_LIST from 'api/api_list'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
import Row from 'components/Grid/Row'
import Logo from 'components/Logo'
import Image from 'next/image'
import useSWR from 'swr'
import ChainStatistics from './ChainStatistics'
import OverviewChart from './Chart'
import MarketStatistics from './MarketStatistics'
import Price from './Price'
import styles from './style.module.scss'

function getEstimateCountedData(estimateCountedData): EstimateCountedInfo {
	return estimateCountedData
}

function getCommonStatsData(commonStatsDataRaw): CommonStats {
	return commonStatsDataRaw
}

function getGasAvgData(gasAvgData): GasTracker {
	return gasAvgData
}

const Overview = () => {
	const { isMobile } = useMobileLayout(1112)

	const _fetchCondition = key => {
		switch (key) {
			case 'estimate_counted_info':
				return [API_LIST.ESTIMATE_COUNTED_INFO]
			case 'common-stats':
				return [API_LIST.COMMON_STATS]
			case 'gas_avg':
				return [API_LIST.GAS_AVG]
			case 'latest_block':
				return [API_LIST.LATEST_BLOCK]
		}
	}
	const { data: estimateCountedDataRaw, error: estimateCountedError } = useSWR<EstimateCountedResponse>(
		_fetchCondition('estimate_counted_info')
	)
	const { data: commonStatsDataRaw, error: commonStatsError } = useSWR<CommonStatsResponse>(
		_fetchCondition('common-stats')
	)
	const { data: gasAvgRaw, error: gasAvgError } = useSWR<GasTrackerResponse>(_fetchCondition('gas_avg'))

	const estimateCountedData = getEstimateCountedData(estimateCountedDataRaw?.result)
	const commonStatsData = getCommonStatsData(commonStatsDataRaw?.result)
	const gasAvgData = getGasAvgData(gasAvgRaw?.result)

	return (
		<div className={clsx(styles.overview, isMobile && 'margin-bottom-2xl')}>
			<div className={isMobile ? styles.moon1Mobile : styles.moon1}>
				<Image alt="moon1" src={'/images/background/moon1.png'} layout="fill" />
			</div>
			<div className={isMobile ? styles.moon2Mobile : styles.moon2}>
				<Image alt="moon2" src={'/images/background/moon2.png'} layout="fill" />
			</div>
			<div className={clsx('row', { 'flex-column': isMobile })}>
				<BackgroundCard
					radius={false}
					classes={clsx(isMobile && 'margin-bottom-md', styles.leftBlock, isMobile && styles.leftMobileBlock)}
				>
					<Row style={{ justifyContent: 'space-between' }}>
						<Logo text="Astra" type="transparent" />
						<Price />
					</Row>
					<div className={styles.separateBlock} />
					<MarketStatistics estimateCountedData={estimateCountedData} commonStatsData={commonStatsData} />
				</BackgroundCard>
				{!isMobile && (
					<div className={clsx('col', styles.centerBlock)}>
						<div className={styles.line} />
					</div>
				)}
				<BackgroundCard classes={clsx(styles.rightBlock, isMobile && styles.rightMobileBlock)} radius={false}>
					<OverviewChart />
					<ChainStatistics
						classes="padding-right-lg padding-left-lg"
						gasTracker={gasAvgData}
						estimateCountedData={estimateCountedData}
						commonStatsData={commonStatsData}
					/>
				</BackgroundCard>
			</div>
		</div>
	)
}

export default Overview
