import { cosmosFetcher, evmFetcher } from 'api'
import InitPage from 'components/Loader/InitPage'
import PageLoader from 'components/Loader/PageLoader'
import dayjs from 'dayjs'
import { NextIntlProvider } from 'next-intl'
import type { NextWebVitalsMetric } from 'next/app'
import { AppProps } from 'next/app'
import { event, GoogleAnalytics } from 'nextjs-google-analytics'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'

import '@astraprotocol/astra-ui/lib/shared/style.css'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import '../prism-theme/dark.scss'
import store, { persistor } from '../store'
import '../styles.css'
dayjs.locale('en')

export function reportWebVitals(metric: NextWebVitalsMetric) {
	const { id, name, label, value } = metric
	event(name, {
		category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
		value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
		label: id, // id unique to current page load
		nonInteraction: true // avoids affecting bounce rate.
	})
}

const App = ({ Component, pageProps }: AppProps) => {
	const { title, description }: { title?: string; description?: string } = pageProps
	const defaultDescription =
		'Astra Explorer allows you to explore and search the Astra blockchain for transactions, addresses, tokens, prices and other activities taking place on Astra (ASA)'

	const _detectFetcher = (rest: any[]) => {
		const path = rest[0] as string
		let fetcher = cosmosFetcher
		if (path.startsWith('evm_')) {
			rest[0] = path.replace('evm_', '')
			fetcher = evmFetcher
		}
		return fetcher.apply(null, rest)
	}

	return (
		<Provider store={store}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
				/>
			</Head>
			<NextSeo
				title={title}
				titleTemplate={`%s | ${process.env.NEXT_PUBLIC_TITLE}`}
				defaultTitle={process.env.NEXT_PUBLIC_TITLE}
				description={description || defaultDescription}
				canonical={process.env.NEXT_PUBLIC_URL}
				openGraph={{
					url: process.env.NEXT_PUBLIC_URL,
					title: `${title} | ${process.env.NEXT_PUBLIC_TITLE}`,
					description: description || defaultDescription,
					images: [
						{
							url: '/images/logo/transparent_logo.png',
							width: 55,
							height: 55,
							alt: process.env.NEXT_PUBLIC_TITLE
						}
					]
				}}
				twitter={{
					handle: '@AstraOfficial5',
					site: '@AstraOfficial5',
					cardType: 'summary_large_image'
				}}
			/>
			<PersistGate loading={<InitPage />} persistor={persistor}>
				<NextIntlProvider messages={(pageProps as typeof pageProps & { messages: any }).messages}>
					<SWRConfig
						value={{
							revalidateOnReconnect: false,
							refreshWhenOffline: false,
							refreshWhenHidden: false,
							refreshInterval: 0,
							fetcher: (...rest) => {
								return _detectFetcher(rest)
							}
						}}
					>
						<>
							{process.env.NODE_ENV === 'production' && <GoogleAnalytics trackPageViews />}
							<PageLoader />
							<ToastContainer toastClassName="dark--mode" />
							<Component {...pageProps} />
						</>
					</SWRConfig>
				</NextIntlProvider>
			</PersistGate>
		</Provider>
	)
}

export default App
