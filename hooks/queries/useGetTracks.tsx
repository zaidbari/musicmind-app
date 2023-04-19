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
	id: string
}

export const useGetTracks = (id: string): TUseTracks => {
	const api = useAxios()

	const [tracks, setTracks] = useState<TTrackItem[]>([])
	const [userPlaylists, setUserPlaylists] = useState<TUserPlaylist[]>([] as TUserPlaylist[])
	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [playlistDetails, setPlaylistDetails] = useState<TPlaylist>({} as TPlaylist)

	const fetchDataInParallel = useCallback(
		async (unmounted: boolean, token: CancelToken) => {
			if (unmounted) return
			try {
				await Promise.all([
					api.get(PLAYLIST_TRACKS_URL + id, { cancelToken: token }),
					api.get(USER_PLAYLIST_URL, { cancelToken: token })
				]).then(async values => {
					setTracks(values[0].data)
					setUserPlaylists(values[1].data)
					const playlist = await AsyncStorage.getItem('@playlist')
					if (playlist !== null) {
						setPlaylistDetails(JSON.parse(playlist))
					}

					setIsLoading(false)
				})
			} catch (error) {
				logger.sentry(error, {
					tags: {
						section: 'fetchDataInParallel'
					}
				})
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[id]
	)

	useEffect(() => {
		let unmounted = false
		let source = axios.CancelToken.source()

		if (id) {
			fetchDataInParallel(unmounted, source.token)
		}
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shoudlReset, id])

	return { tracks, isLoading, setShouldReset, playlistDetails, userPlaylists }
}
