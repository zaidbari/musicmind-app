import { MAIN_CONTAINER_URL } from '@/constants/urls'
import { Container } from '@/types/container'
import axios, { CancelToken } from 'axios'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { logger } from '@/utils/logger'

export const useGetContainers = (): {
	containers: Container[]
	isLoading: boolean
	setShouldReset: Dispatch<SetStateAction<boolean>>
	search: Dispatch<SetStateAction<string>>
} => {
	const api = useAxios()

	const [containers, setContainers] = useState<Container[]>([])
	const [origianlContainers, setOriginalContainers] = useState<Container[]>([])

	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [searchTerm, search] = useState<string>('')

	const fetchContainers = useCallback(async (unmounted: boolean, token: CancelToken) => {
		setIsLoading(true)
		try {
			if (!unmounted) {
				const { data } = await api.get(MAIN_CONTAINER_URL, { cancelToken: token })
				setOriginalContainers(data)
				setContainers(data)
			}
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: 'fetchContainers'
				}
			})
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		if (searchTerm) {
			const filteredContainers = origianlContainers.filter(container => {
				return container.name.toLowerCase().includes(searchTerm.toLowerCase())
			})
			setContainers(filteredContainers)
		} else {
			setContainers(origianlContainers)
		}
	}, [searchTerm])

	useEffect(() => {
		let unmounted = false
		let source = axios.CancelToken.source()

		fetchContainers(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}
	}, [shoudlReset])

	return { containers, isLoading, setShouldReset, search }
}
