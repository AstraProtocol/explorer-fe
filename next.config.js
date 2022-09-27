/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false
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
