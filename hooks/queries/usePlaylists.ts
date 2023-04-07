import { TPlaylist } from '@/types/playlist.d'
import { PLAYLIST_GROUP_URL } from '@/constants/urls'
import axios, { CancelToken } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import useAxios from '../useAxios'
import { logger } from '@/utils/logger'

export const usePlaylists = (id: string) => {
	const api = useAxios()

	const [playlists, setPlaylists] = useState<TPlaylist[]>([])
	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchContainers = useCallback(
		async (unmounted: boolean, token: CancelToken) => {
			setIsLoading(true)
			try {
				if (!unmounted) {
					const { data } = await api.get(PLAYLIST_GROUP_URL + id, { cancelToken: token })
					setPlaylists(data)
				}
			} catch (error) {
				logger.log(error)
			} finally {
				setIsLoading(false)
			}
		},
		[id]
	)

	useEffect(() => {
		let unmounted = false
		let source = axios.CancelToken.source()

		fetchContainers(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}
	}, [shoudlReset])

	return { playlists, isLoading, setShouldReset }
}
