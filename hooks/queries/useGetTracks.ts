import { PLAYLIST_TRACKS_URL } from '@/constants/urls'
import { TPlaylist } from '@/types/playlist'
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
}

export const useGetTracks = (id: string): TUseTracks => {
	const api = useAxios()

	const [tracks, setTracks] = useState<TTrackItem[]>([])
	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [playlistDetails, setPlaylistDetails] = useState<TPlaylist>({} as TPlaylist)

	const fetchDataInParallel = useCallback(
		async (unmounted: boolean, token: CancelToken) => {
			if (unmounted) return
			try {
				const { data } = await api.get(PLAYLIST_TRACKS_URL + id, { cancelToken: token })
				setTracks(data)

				const playlist = await AsyncStorage.getItem('@playlist')
				if (playlist !== null) {
					setPlaylistDetails(JSON.parse(playlist))
				}

				setIsLoading(false)
			} catch (error) {
				logger.sentry(error, {
					tags: {
						section: 'fetchDataInParallel'
					}
				})
				setIsLoading(false)
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

	return { tracks, isLoading, setShouldReset, playlistDetails }
}
