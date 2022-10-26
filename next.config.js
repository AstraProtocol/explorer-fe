/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		NEXT_PUBLIC_COSMOS_API: 'https://chainindexing.astranaut.dev',
		NEXT_PUBLIC_EVM_API: 'https://blockscout.astranaut.dev',
		NEXT_PUBLIC_BLOCK_INTERVAL: '5000',
		NEXT_PUBLIC_TRANSACTION_INTERVAL: '5000',
		NEXT_PUBLIC_TITLE: 'Astra Explorer',
		NEXT_PUBLIC_DATE_FORMAT_VI: 'DD/MM/YYYY',
		NEXT_PUBLIC_DATE_FROMAT_OTHER: 'MM/DD/YYYY',
		NEXT_PUBLIC_ITEM_SHOW_HOME_PAGE: 7,
		NEXT_PUBLIC_EVM_TOKEN: 'asa',
		NEXT_PUBLIC_PAGE_OFFSET: 10,
		NEXT_PUBLIC_MAXIMUM_FRACTION_DIGITS: 4
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
