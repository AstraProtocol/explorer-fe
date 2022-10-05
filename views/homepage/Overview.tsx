import API_LIST from 'api/api_list'
import clsx from 'clsx'
import BackgroundCard from 'components/Card/Background/BackgroundCard'
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
	const { data: estimateCountedDataRaw, error: estimateCountedError } = useSWR<EstimateCountedInfo>(
		_fetchCondition('estimate_counted_info')
	)
	const { data: commonStatsDataRaw, error: commonStatsError } = useSWR<CommonStats>(_fetchCondition('common-stats'))
	const { data: gasAvgRaw, error: gasAvgError } = useSWR<GasTracker>(_fetchCondition('gas_avg'))

	const estimateCountedData = getEstimateCountedData(estimateCountedDataRaw)
	const commonStatsData = getCommonStatsData(commonStatsDataRaw)
	const gasAvgData = getGasAvgData(gasAvgRaw)

	return (
		<div className={clsx(styles.overview)}>
			<div className={styles.moon1}>
				<Image src={'/images/background/moon1.png'} layout="fill" />
			</div>
			<div className={styles.moon2}>
				<Image src={'/images/background/moon2.png'} layout="fill" />
			</div>
			<BackgroundCard>
				<div className="row md-wrap">
					<div className={clsx('col col-5', styles.leftBlock)}>
						<div className={clsx('row', 'block-ver-center')}>
							<div className={clsx('col col-6')}>
								<Logo text="Astra" type="transparent" />
							</div>
							<div className={clsx('col col-6')}>
								<Price />
							</div>
						</div>
						<div className={styles.separateBlock} />
						<MarketStatistics estimateCountedData={estimateCountedData} commonStatsData={commonStatsData} />
					</div>
					<div className={clsx('col', styles.centerBlock)} />
					<div className={clsx('col col-7', styles.rightBlock)}>
						<OverviewChart />
						<ChainStatistics
							gasTracker={gasAvgData}
							estimateCountedData={estimateCountedData}
							commonStatsData={commonStatsData}
						/>
					</div>
				</div>
			</BackgroundCard>
		</div>
	)
}

export default Overview
