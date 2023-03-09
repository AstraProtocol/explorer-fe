import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'cypress'

const { combinedEnv } = loadEnvConfig(process.cwd())

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
		screenshotOnRunFailure: false,
		defaultCommandTimeout: 10000
		// experimentalSessionAndOrigin: true
	},
	blockHosts: ['vitals.vercel-insights.com', '*sentry.io', '*googletagmanager.com']
})
