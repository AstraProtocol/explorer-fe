import { NextIntlProvider } from 'next-intl'
import { AppProps } from 'next/app'

import '@astraprotocol//astra-ui/shared/style.css'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<NextIntlProvider messages={pageProps.messages}>
			<Component {...pageProps} />
		</NextIntlProvider>
	)
}

export default App
