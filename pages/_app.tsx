import { NextIntlProvider } from 'next-intl'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import '@astraprotocol//astra-ui/shared/style.css'
import { cosmosFetcher, evmFetcher } from 'api'
import { SWRConfig } from 'swr'
import store, { persistor } from '../store'

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
			<PersistGate loading={'loading'} persistor={persistor}>
				<NextIntlProvider messages={(pageProps as typeof pageProps & { messages: any }).messages}>
					<SWRConfig
						value={{
							fetcher: (...rest) => {
								return _detectFetcher(rest)
							}
						}}
					>
						<Component {...pageProps} />
					</SWRConfig>
				</NextIntlProvider>
			</PersistGate>
		</Provider>
	)
}

export default App
