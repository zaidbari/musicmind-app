import { useEffect, useState } from 'react'
import { useGetCopiedPlaylists } from './useGetCopiedPlaylists'
import { useGetUserPlaylists } from './useGetUserPlaylists'
import { TCopiedPlaylists, TUserPlaylist } from '@/types/playlist'
import useAxios from '@/hooks/useAxios'
import { USER_PLAYLIST_URL } from '@/constants/urls'
import { logger } from '@/utils/logger'

type TGetMyPlaylistsDataReturnType = {
	copiedPlaylists: TCopiedPlaylists[]
	userPlaylists: TUserPlaylist[]
	isLoading: boolean
	deleteUserPlaylist: (id: number, type: 'assigned' | 'user') => void
}

export const useGetMyPlaylistsData = (): TGetMyPlaylistsDataReturnType => {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const { copiedPlaylists: copiedPlaylistsOriginal, isLoading: copiedPlaylistsLoading } = useGetCopiedPlaylists()
	const { userPlaylists: userPlaylistsOriginal, isLoading: userPlaylistsLoading } = useGetUserPlaylists()

	const [copiedPlaylists, setCopiedPlaylists] = useState<TCopiedPlaylists[]>([])
	const [userPlaylists, setUserPlaylists] = useState<TUserPlaylist[]>([])

	const api = useAxios()

	const deleteUserPlaylist = async (id: number, type: 'assigned' | 'user') => {
		try {
			// TODO: uncomment when backend will be ready
			// await api.post(`${USER_PLAYLIST_URL}/${id}/`)

			if (type === 'assigned') {
				setCopiedPlaylists(prev => prev.filter(playlist => playlist.id !== id))
			} else {
				setUserPlaylists(prev => prev.filter(playlist => playlist.id !== id))
			}
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: 'deleteUserPlaylist'
				}
			})
		}
	}

	useEffect(() => {
		if (!copiedPlaylistsLoading && !userPlaylistsLoading) {
			setCopiedPlaylists(copiedPlaylistsOriginal)
			setUserPlaylists(userPlaylistsOriginal)
			setIsLoading(false)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [copiedPlaylistsLoading, userPlaylistsLoading])

	return { copiedPlaylists, userPlaylists, deleteUserPlaylist, isLoading }
}
