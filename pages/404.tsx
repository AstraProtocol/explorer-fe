import Container from 'components/Container'
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
			<Container>
				<div className="text text-2xl padding-xl">
					<h1>404</h1> <br />
					<h4>This page could not be found.</h4>
				</div>
			</Container>
		</Layout>
	)
}
export default Home
