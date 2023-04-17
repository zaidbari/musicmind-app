import { PLAYLIST_GROUP_URL } from '@/constants/urls'
import useAxios from '@/hooks/useAxios'
import { TPlaylist } from '@/types/playlist.d'
import { logger } from '@/utils/logger'
import axios, { CancelToken } from 'axios'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

export const useGetPlaylists = (
	id: string
): {
	playlists: TPlaylist[]
	isLoading: boolean
	setShouldReset: Dispatch<SetStateAction<boolean>>
	search: Dispatch<SetStateAction<string>>
} => {
	const api = useAxios()

	const [playlists, setPlaylists] = useState<TPlaylist[]>([])
	const [originalPlaylists, setOriginalPlaylists] = useState<TPlaylist[]>([])
	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [searchTerm, search] = useState<string>('')

	const fetchPlaylistById = useCallback(
		async (unmounted: boolean, token: CancelToken) => {
			setIsLoading(true)
			try {
				if (!unmounted) {
					const { data } = await api.get(PLAYLIST_GROUP_URL + id, { cancelToken: token })
					setPlaylists(data)
					setOriginalPlaylists(data)
				}
			} catch (error) {
				logger.sentry(error, {
					tags: {
						section: 'fetchPlaylistById'
					}
				})
			} finally {
				setIsLoading(false)
			}
		},
		[id]
	)

	useEffect(() => {
		if (searchTerm) {
			const filteredPlaylists = originalPlaylists.filter(playlist => {
				return playlist.playlist_name.toLowerCase().includes(searchTerm.toLowerCase())
			})
			setPlaylists(filteredPlaylists)
		} else {
			setPlaylists(originalPlaylists)
		}
	}, [searchTerm])

	useEffect(() => {
		let unmounted = false
		let source = axios.CancelToken.source()

		fetchPlaylistById(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}
	}, [shoudlReset])

	return { playlists, isLoading, setShouldReset, search }
}
