import '@astraprotocol/astra-ui/lib/shared/style.css'
import { cosmosFetcher, evmFetcher } from 'api'
import PageLoader from 'components/Loader/PageLoader'
import dayjs from 'dayjs'
import { NextIntlProvider } from 'next-intl'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'

import { SWRConfig } from 'swr'
import '../prism-theme/dark.scss'
import store, { persistor } from '../store'
import '../styles.css'

dayjs.locale('en')

const App = ({ Component, pageProps }: AppProps) => {
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
				<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
			</Head>
			<PersistGate loading={'loading'} persistor={persistor}>
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
							<Head>
								<meta name="viewport" content="initial-scale=1.0, width=device-width" />
							</Head>
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
