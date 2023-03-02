import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'cypress'

const { combinedEnv } = loadEnvConfig(process.cwd())
export default defineConfig({
	env: {
		...combinedEnv,
		NEXT_PUBLIC_COSMOS_API: 'https://chainindexing.astranaut.io',
		NEXT_PUBLIC_EVM_API: 'https://blockscout.astranaut.io',
		NEXT_PUBLIC_URL: 'https://explorer.astranaut.io',
		NEXT_PUBLIC_CHAIN_ID: 11110,
		NEXT_PUBLIC_TITLE: 'Astra Explorer',
		NEXT_PUBLIC_ENV: 'mainnet'
	},
	e2e: {
		baseUrl: 'http://localhost:3000',
		retries: {
			runMode: 3
		},
		viewportHeight: 800,
		viewportWidth: 1280,
		video: false,
		screenshotOnRunFailure: false
		// experimentalSessionAndOrigin: true
	}
})
