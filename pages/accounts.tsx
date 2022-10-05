import Container from 'components/Container'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout'

const AccountsPage: React.FC<NextPage> = _ => {
	// // const t = useTranslations('Index')

	return (
		<Layout>
			<Head>
				<title>Astra Explorer</title>
			</Head>
			<Container>Account</Container>
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
export default AccountsPage
