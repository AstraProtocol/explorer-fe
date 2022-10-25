import { useState } from 'react'

const usePaginationLite = () => {
	const [currentParam, setCurrentParam] = useState('')
	const [params, setParams] = useState([])

	const makeNextPage = (nextParam: string) => {
		const newParams = [...params]
		newParams.push(currentParam)

		if (currentParam) setParams(newParams)
		setCurrentParam(nextParam)
	}
	const makePrevPage = () => {
		const newParams = [...params]
		const newCurrentParam = newParams.pop()

		setParams(newParams)
		setCurrentParam(newCurrentParam)
	}

	return {
		currentParam,
		makeNextPage,
		makePrevPage
	}
}

export default usePaginationLite
