import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="shortcut icon" href="/images/logo/white_logo.svg" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<body>
				<Main />
				<NextScript />
				<div id="modal-root"></div>
			</body>
		</Html>
	)
}
