import { COPYPLAYLIST_ASSIGNED_URL } from '@/constants/urls'
import useAxios from '@/hooks/useAxios'
import { TCopiedPlaylists } from '@/types/playlist'
import { logger } from '@/utils/logger'
import axios, { CancelToken } from 'axios'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

type TGetUserPlaylistReturnType = {
	copiedPlaylists: TCopiedPlaylists[]
	isLoading: boolean
	setShouldReset: Dispatch<SetStateAction<boolean>>
}

export const useGetCopiedPlaylists = (): TGetUserPlaylistReturnType => {
	const api = useAxios()

	const [copiedPlaylists, setCopiedPlaylists] = useState<TCopiedPlaylists[]>([])

	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchCopiedPlaylists = useCallback(async (unmounted: boolean, token: CancelToken) => {
		try {
			if (!unmounted) {
				const { data } = await api.get(COPYPLAYLIST_ASSIGNED_URL, {
					cancelToken: token
				})

				const sorted = data.sort((a: TCopiedPlaylists, b: TCopiedPlaylists) => {
					return a.playlist_name.localeCompare(b.playlist_name)
				})

				setCopiedPlaylists(sorted)
			}
		} catch (err) {
			logger.sentry(err, {
				tags: {
					section: 'fetchCopiedPlaylists'
				}
			})
		} finally {
			setIsLoading(false)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		let unmounted = false
		const source = axios.CancelToken.source()

		fetchCopiedPlaylists(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shoudlReset])

	return { copiedPlaylists, isLoading, setShouldReset }
}
