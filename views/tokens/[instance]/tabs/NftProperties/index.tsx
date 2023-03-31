import CardInfo, { CardRowItem } from 'components/Card/CardInfo'
import { useCallback } from 'react'
import { TransactionCardTypeEnum } from 'utils/enum'

interface Props {
	tokenData: TokenNFTMetadata
}

const NftPropertiesTab = ({ tokenData }: Props) => {
	const _convertRawDataToCardData = useCallback((data: TokenNFTAttributes[]): CardRowItem[] => {
		if (!data) return []
		let items: CardRowItem[] = []
		for (let item of data) {
			if (item !== undefined && item !== null)
				items.push({
					label: item.trait_type,
					type: TransactionCardTypeEnum.TEXT,
					contents: [{ value: item.value }]
				})
		}

		return items
	}, [])

	return (
		<CardInfo
			topElement={<span className="text text-xl padding-2xl">Properties</span>}
			items={_convertRawDataToCardData(tokenData.attributes)}
			classes={['margin-top-sm padding-top-md']}
			background={false}
			backgroundCardBlur={false}
		/>
	)
}

export default NftPropertiesTab
