import clsx from 'clsx'
import Container from 'components/Container'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { HomeBlock } from 'view/Block/HomeBlock'
import { HomeTransactions } from 'view/Transactions/HomeTransactions'
import Layout from '../components/Layout'
import Search from '../components/Search'

const Home: React.FC<NextPage> = _ => {
	// // const t = useTranslations('Index')

	return (
		<Layout>
			<Head>
				<title>Explorer</title>
			</Head>
			<Search />
			<Container>
				<div className="row md-wrap">
					<div className={clsx('col col-6 gutter-right')}>
						<HomeBlock />
					</div>
					<div className={clsx('col col-6')}>
						<HomeTransactions />
					</div>
				</div>
			</Container>
		</Layout>
	)
}
// // type HomeExtendProps = typeof Home & { messages: string[] }
// // ;(Home as HomeExtendProps).messages = ['Index']

// // export async function getStaticProps({ locale }: GetStaticPropsContext) {
// // 	return {
// // 		props: {
// // 			messages: pick(
// // 				{
// // 					...(await import(`../messages/share/${locale}.json`)).default,
// // 					...(await import(`../messages/index/${locale}.json`)).default
// // 				},
// // 				(Home as HomeExtendProps).messages
// // 			)
// // 		}
// // 	}
// // }
export default Home
