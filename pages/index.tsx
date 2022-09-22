import { GetStaticPropsContext, NextPage } from 'next'
import { useTranslations } from 'next-intl'
import pick from 'lodash/pick'
import React from 'react'
import Layout from '../components/Layout'
import Search from '../components/Search'

const Home: React.FC<NextPage> = _ => {
	const t = useTranslations('Index')
	return (
		<Layout>
			{t('title')}
			<Search />
		</Layout>
	)
}
type HomeExtendProps = typeof Home & { messages: string[] }
;(Home as HomeExtendProps).messages = ['Index']

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	return {
		props: {
			messages: pick(
				{
					...(await import(`../messages/share/${locale}.json`)).default,
					...(await import(`../messages/index/${locale}.json`)).default
				},
				(Home as HomeExtendProps).messages
			)
		}
	}
}
export default Home
