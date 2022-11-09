import { ModalWrapper } from '@astraprotocol/astra-ui'
import Spinner from 'components/Spinner'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './style.module.scss'

function PageLoader() {
	const router = useRouter()

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const handleStart = url => url !== router.asPath && setLoading(true)
		const handleComplete = url => {
			if (!url || typeof url !== 'string') return setLoading(false)
			return url?.includes(router.asPath) && setLoading(false)
		}
		const handleError = e => setLoading(false)

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError', handleError)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
		}
	})

	return (
		loading && (
			<ModalWrapper open={loading}>
				<div className={styles.pageLoading}>
					<Spinner size="lg" />
				</div>
			</ModalWrapper>
		)
	)
}

export default PageLoader
