import { useEffect, useState } from 'react'
import { useGetCopiedPlaylists } from './useGetCopiedPlaylists'
import { useGetUserPlaylists } from './useGetUserPlaylists'
import { TCopiedPlaylists, TUserPlaylist } from '@/types/playlist'
import useAxios from '@/hooks/useAxios'
import { COPYPLAYLIST_ASSIGNED_URL, USER_PLAYLIST_URL } from '@/constants/urls'
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
			if (type === 'assigned') {
				await api.delete(`${COPYPLAYLIST_ASSIGNED_URL}/${id}`)
				setCopiedPlaylists(prev => prev.filter(playlist => playlist.id !== id))
			} else {
				await api.delete(`${USER_PLAYLIST_URL}/${id}`)
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
