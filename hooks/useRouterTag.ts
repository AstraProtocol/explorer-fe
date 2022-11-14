import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useRouterTag = (): [string, (tabIndex: string) => void] => {
	const router = useRouter()
	const [defaultTag, setDefaultTag] = useState<string>('')

	const setTag = (value: string) => router.replace(`#${value}`)

	useEffect(() => {
		if (!defaultTag) {
			const getTag = router.asPath.split('#')[1] || ''
			setDefaultTag(getTag)
		}
	}, [router.asPath, defaultTag])

	return [defaultTag, setTag]
}

export default useRouterTag
