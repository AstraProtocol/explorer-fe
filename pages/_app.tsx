import { NextIntlProvider } from 'next-intl'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import '@astraprotocol/astra-ui/lib/shared/style.css'
import store, { persistor } from '../store'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<PersistGate loading={'loading'} persistor={persistor}>
				<NextIntlProvider messages={(pageProps as typeof pageProps & { messages: any }).messages}>
					<Component {...pageProps} />
				</NextIntlProvider>
			</PersistGate>
		</Provider>
	)
}

export default App
