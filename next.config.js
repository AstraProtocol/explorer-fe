/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
	reactStrictMode: false,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				pathname: '/**'
			}
		]
	},
	async rewrites() {
		return [
			{
				source: '/blocks',
				destination: '/block'
			},
			{
				source: '/blocks/:blockId',
				destination: '/block/:blockId'
			},
			{
				source: '/txs',
				destination: '/tx'
			},
			{
				source: '/txs/:txHash',
				destination: '/tx/:txHash'
			}
		]
	},
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
		return config
	}
}

const moduleExports = {
	...nextConfig,

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
	silent: true, // Logging when deploying to check if there is any problem
	validate: true
	// Set to env false will skip deploying release on Sentry except Production
	// https://github.com/getsentry/sentry-webpack-plugin/blob/master/src/index.js#L522
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports =
	process.env.NEXT_PUBLIC_ENV === 'mainnet' ? withSentryConfig(moduleExports, sentryWebpackPluginOptions) : nextConfig
