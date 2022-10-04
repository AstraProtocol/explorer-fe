import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout'

const Home: React.FC<NextPage> = _ => {
	// // const t = useTranslations('Index')

	return (
		<Layout>
			<Head>
				<title>{process.env.NEXT_PUBLIC_TITLE}</title>
			</Head>
			<div className="block-center text text-2xl padding-xl">404 | This page could not be found.</div>
		</Layout>
	)
}
export default Home
