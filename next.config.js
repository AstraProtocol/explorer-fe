/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		NEXT_PUBLIC_COSMOS_API: 'https://chainindexing.astranaut.dev',
		NEXT_PUBLIC_EVM_API: 'https://blockscout.astranaut.dev',
		NEXT_PUBLIC_URL: 'https://explorer.astranaut.dev',
		NEXT_PUBLIC_CHAIN_ID: 11115,
		NEXT_PUBLIC_TITLE: 'Astra Explorer Testnet',

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

module.exports = {
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
	}
}
