import { INTERNAL_PLAYLIST_GROUP_URL, PLAYLIST_GROUP_URL } from '@/constants/urls'
import useAxios from '@/hooks/useAxios'
import { TPlaylist } from '@/types/playlist.d'
import { logger } from '@/utils/logger'
import axios, { CancelToken } from 'axios'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

type TUseGetPlaylists = {
	playlists: TPlaylist[]
	isLoading: boolean
	setShouldReset: Dispatch<SetStateAction<boolean>>
	search: Dispatch<SetStateAction<string>>
}

export const useGetPlaylists = (id: string, type?: string): TUseGetPlaylists => {
	const api = useAxios()

	const [playlists, setPlaylists] = useState<TPlaylist[]>([])
	const [originalPlaylists, setOriginalPlaylists] = useState<TPlaylist[]>([])
	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [searchTerm, search] = useState<string>('')

	const fetchPlaylistById = useCallback(
		async (unmounted: boolean, token: CancelToken) => {
			try {
				if (!unmounted) {
					const { data } = await api.get((type ? INTERNAL_PLAYLIST_GROUP_URL : PLAYLIST_GROUP_URL) + id, {
						cancelToken: token
					})

					// sort playlists by position, if position is same, sort by name
					const sorted = data.sort((a: TPlaylist, b: TPlaylist) => {
						if (a.position === b.position) {
							return a.playlist_name.localeCompare(b.playlist_name)
						}
						return a.position - b.position
					})

					setPlaylists(sorted)
					setOriginalPlaylists(sorted)
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[id]
	)

	useEffect(() => {
		if (searchTerm !== '' && originalPlaylists.length) {
			const filteredPlaylists = originalPlaylists.filter(playlist => {
				return playlist.playlist_name.toLowerCase().includes(searchTerm.toLowerCase())
			})
			setPlaylists(filteredPlaylists)
		} else {
			setPlaylists(originalPlaylists)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm])

	useEffect(() => {
		setIsLoading(true)

		let unmounted = false
		let source = axios.CancelToken.source()

		if (id) fetchPlaylistById(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shoudlReset, id])

	return { playlists, isLoading, setShouldReset, search }
}
