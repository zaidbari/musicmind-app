import { NEWS_FEED_URL } from '@/constants/urls'
import useAxios from '@/hooks/useAxios'
import { TNewsfeed } from '@/types/newsfeed'
import { logger } from '@/utils/logger'
import axios, { CancelToken } from 'axios'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

type TGetNewsfeedReturnType = {
	newsfeed: TNewsfeed[]
	isLoading: boolean
	setShouldReset: Dispatch<SetStateAction<boolean>>
}

export const useGetNewsfeed = (): TGetNewsfeedReturnType => {
	const api = useAxios()

	const [newsfeed, setNewsfeed] = useState<TNewsfeed[]>([])

	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchNewsfeed = useCallback(async (unmounted: boolean, token: CancelToken) => {
		try {
			if (!unmounted) {
				const { data } = await api.get(NEWS_FEED_URL, { cancelToken: token })
				setNewsfeed(data)
			}
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: 'fetchNewsfeed'
				}
			})
		} finally {
			setIsLoading(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		let unmounted = false
		let source = axios.CancelToken.source()

		fetchNewsfeed(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shoudlReset])

	return { newsfeed, isLoading, setShouldReset }
}
