import { MAIN_CONTAINER_URL } from '@/constants/urls'
import { Container } from '@/types/container'
import axios, { CancelToken } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { logger } from '@/utils/logger'

export const useContainers = () => {
	const api = useAxios()

	const [containers, setContainers] = useState<Container[]>([])
	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchContainers = useCallback(async (unmounted: boolean, token: CancelToken) => {
		setIsLoading(true)
		try {
			if (!unmounted) {
				const { data } = await api.get(MAIN_CONTAINER_URL, { cancelToken: token })
				setContainers(data)
			}
		} catch (error) {
			logger.log(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		let unmounted = false
		let source = axios.CancelToken.source()

		fetchContainers(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}
	}, [shoudlReset])

	return { containers, isLoading, setShouldReset }
}
