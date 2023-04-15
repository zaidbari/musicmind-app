import { PLAYLIST_TRACKS_URL } from '@/constants/urls'
import { TPlaylist } from '@/types/playlist'
import { TTrackItem } from '@/types/track'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { CancelToken } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import useAxios from '../useAxios'
import { logger } from '@/utils/logger'

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

	const fetchContainers = useCallback(
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

	return { tracks, isLoading, setShouldReset, playlistDetails }
}
