/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
	reactStrictMode: false,
	env: {
		NEXT_PUBLIC_COSMOS_API: 'https://chainindexing.astranaut.dev',
		NEXT_PUBLIC_EVM_API: 'https://blockscout.astranaut.dev',
		NEXT_PUBLIC_URL: 'https://explorer.astranaut.dev',
		NEXT_PUBLIC_CHAIN_ID: 11115,
		NEXT_PUBLIC_TITLE: 'Astra Explorer Testnet',
		NEXT_PUBLIC_SENTRY_DSN: 'https://0df08007fb014e5fa05ce2a4fb3fccea@sentry.tiki.com.vn/473',

		NEXT_PUBLIC_BLOCK_INTERVAL: '5000',
		NEXT_PUBLIC_TRANSACTION_INTERVAL: '5000',
		NEXT_PUBLIC_DATE_FORMAT_VI: 'DD/MM/YYYY',
		NEXT_PUBLIC_DATE_FROMAT_OTHER: 'MM/DD/YYYY',
		NEXT_PUBLIC_ITEM_SHOW_HOME_PAGE: 7,
		NEXT_PUBLIC_PAGE_OFFSET: 10,
		NEXT_PUBLIC_MAXIMUM_FRACTION_DIGITS: 4,
		NEXT_PUBLIC_NATIVE_TOKEN: 'asa'
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ipfs.io',
				pathname: '/ipfs/**'
			},
			{
				protocol: 'https',
				hostname: 'astranaut.dev',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'astranaut.io',
				pathname: '/**'
			}
		]
	}
}

const moduleExports = {
	...nextConfig,
	i18n: {
		locales: ['en', 'vi'],
		defaultLocale: 'en'
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: { and: [/\.(js|ts)x?$/] },
			use: ['@svgr/webpack']
		})
		// config.module.rules.push({
		// 	test: /\.s?css$/,
		// 	use: ['style-loader', 'css-loader', 'sass-loader'],
		// })
		// config.module.rules.push({
		// 	test: /\.s[ac]ss$/i,
		// 	use: {
		// 		loader: 'sass-loader',
		// 		// options: {
		// 		// 	additionalData: '@import "src/styles/variables.scss";'
		// 		// }
		// 	}
		// })

		return config
	},
	sentry: {
		hideSourceMaps: true
		// See the sections below for information on the following options:
		//   'Configure Source Maps':
		//     - disableServerWebpackPlugin
		//     - disableClientWebpackPlugin
		//     - hideSourceMaps
		//     - widenClientFileUpload
		//   'Configure Legacy Browser Support':
		//     - transpileClientSDK
		//   'Configure Serverside Auto-instrumentation':
		//     - autoInstrumentServerFunctions
		//
	}
}

const sentryWebpackPluginOptions = {
	// Additional config options for the Sentry Webpack plugin. Keep in mind that
	// the following options are set automatically, and overriding them is not
	// recommended:
	//   release, url, org, project, authToken, configFile, stripPrefix,
	//   urlPrefix, include, ignore

	silent: true // Suppresses all logs
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
