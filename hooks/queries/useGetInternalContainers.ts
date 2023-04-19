import { INTERNAL_CONTAINER_URL } from '@/constants/urls'
import useAxios from '@/hooks/useAxios'
import { Container } from '@/types/container'
import { logger } from '@/utils/logger'
import axios, { CancelToken } from 'axios'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

type TGetContainerReturnType = {
	containers: Container[]
	isLoading: boolean
	setShouldReset: Dispatch<SetStateAction<boolean>>
	search: Dispatch<SetStateAction<string>>
}

export const useGetInternalContainers = (): TGetContainerReturnType => {
	const api = useAxios()

	const [containers, setContainers] = useState<Container[]>([])
	const [origianlContainers, setOriginalContainers] = useState<Container[]>([])

	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [searchTerm, search] = useState<string>('')

	const fetchInternalContainers = useCallback(async (unmounted: boolean, token: CancelToken) => {
		try {
			if (!unmounted) {
				const { data } = await api.get(INTERNAL_CONTAINER_URL, {
					cancelToken: token
				})

				// sort playlists by position, if position is same, sort by name
				const sorted = data.sort((a: Container, b: Container) => {
					if (a.position === b.position) {
						return a.name.localeCompare(b.name)
					}
					return a.position - b.position
				})

				setOriginalContainers(sorted)
				setContainers(sorted)
			}
		} catch (err) {
			logger.sentry(err, {
				tags: {
					section: 'fetchInternalContainers'
				}
			})
		} finally {
			setIsLoading(false)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (searchTerm) {
			const filteredContainers = origianlContainers.filter((container: Container) => {
				return container.name.toLowerCase().includes(searchTerm.toLowerCase())
			})
			setContainers(filteredContainers)
		} else {
			setContainers(origianlContainers)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm])

	useEffect(() => {
		let unmounted = false
		const source = axios.CancelToken.source()

		fetchInternalContainers(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shoudlReset])

	return { containers, isLoading, setShouldReset, search }
}
