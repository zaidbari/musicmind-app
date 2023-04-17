import { PLAYLIST_TRACKS_URL, USER_PLAYLIST_URL } from '@/constants/urls'
import { TPlaylist, TUserPlaylist } from '@/types/playlist'
import { TTrackItem } from '@/types/track'
import { logger } from '@/utils/logger'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { CancelToken } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import useAxios from '../useAxios'

type TUseTracks = {
	tracks: TTrackItem[]
	isLoading: boolean
	setShouldReset: React.Dispatch<React.SetStateAction<boolean>>
	playlistDetails: TPlaylist
	userPlaylists: TUserPlaylist[]
}

export const useGetTracks = (id: string): TUseTracks => {
	const api = useAxios()

	const [tracks, setTracks] = useState<TTrackItem[]>([])
	const [userPlaylists, setUserPlaylists] = useState<TUserPlaylist[]>([] as TUserPlaylist[])
	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [playlistDetails, setPlaylistDetails] = useState<TPlaylist>({} as TPlaylist)

	const fetchUserPlaylist = useCallback(async (unmounted: boolean, token: CancelToken) => {
		setIsLoading(true)
		try {
			if (!unmounted) {
				const { data } = await api.get(USER_PLAYLIST_URL, { cancelToken: token })
				setUserPlaylists(data)
			}
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: 'fetchUserPlaylist'
				}
			})
		} finally {
			setIsLoading(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchTracksByPlaylistId = useCallback(
		async (unmounted: boolean, token: CancelToken) => {
			setIsLoading(true)
			try {
				if (!unmounted) {
					const { data } = await api.get(PLAYLIST_TRACKS_URL + id, { cancelToken: token })
					setTracks(data)
					const playlist = await AsyncStorage.getItem('@playlist')
					if (playlist) {
						setPlaylistDetails(JSON.parse(playlist))
					}
				}
			} catch (error) {
				logger.sentry(error, {
					tags: {
						section: 'fetchTracksByPlaylistId'
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
		let unmounted = false
		let source = axios.CancelToken.source()

		fetchTracksByPlaylistId(unmounted, source.token)
		fetchUserPlaylist(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shoudlReset])

	return { tracks, isLoading, setShouldReset, playlistDetails, userPlaylists }
}
