import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="shortcut icon" href="/images/logo/white_logo.svg" />
			</Head>
			<body>
				<Main />
				<NextScript />
				<div id="modal-root"></div>
			</body>
		</Html>
	)
}
