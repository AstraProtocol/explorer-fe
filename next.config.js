/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		NEXT_PUBLIC_COSMOS_API: 'https://explorer.astranaut.dev',
		NEXT_PUBLIC_EVM_API: 'http://128.199.238.171:8080/api/v1',
		NEXT_PUBLIC_BLOCK_INTERVAL: '5000',
		NEXT_PUBLIC_TRANSACTION_INTERVAL: '5000'
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
