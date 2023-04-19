import { USER_PLAYLIST_URL } from '@/constants/urls'
import useAxios from '@/hooks/useAxios'
import { Container } from '@/types/container'
import { TUserPlaylist } from '@/types/playlist'
import { logger } from '@/utils/logger'
import axios, { CancelToken } from 'axios'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

type TGetUserPlaylistReturnType = {
	userPlaylists: TUserPlaylist[]
	isLoading: boolean
	setShouldReset: Dispatch<SetStateAction<boolean>>
}

export const useGetUserPlaylists = (): TGetUserPlaylistReturnType => {
	const api = useAxios()

	const [userPlaylists, setUserPlaylists] = useState<TUserPlaylist[]>([])

	const [shoudlReset, setShouldReset] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchUserPlaylists = useCallback(async (unmounted: boolean, token: CancelToken) => {
		try {
			if (!unmounted) {
				const { data } = await api.get(USER_PLAYLIST_URL, {
					cancelToken: token
				})
				const sorted = data.sort((a: Container, b: Container) => {
					if (a.position === b.position) {
						return a.name.localeCompare(b.name)
					}
					return a.position - b.position
				})

				setUserPlaylists(sorted)
			}
		} catch (err) {
			logger.sentry(err, {
				tags: {
					section: 'fetchUserPlaylists'
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

		fetchUserPlaylists(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shoudlReset])

	return { userPlaylists, isLoading, setShouldReset }
}
