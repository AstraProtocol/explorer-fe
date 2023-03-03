import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'cypress'

const { combinedEnv } = loadEnvConfig(process.cwd())
console.log('combinedEnv', combinedEnv)
export default defineConfig({
	env: combinedEnv,
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
	},
	blockHosts: ['vitals.vercel-insights.com', '*sentry.io', '*googletagmanager.com']
})
