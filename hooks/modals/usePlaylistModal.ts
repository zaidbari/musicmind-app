import { TUserPlaylist } from '@/types/playlist'
import { createContext, useContext } from 'react'

export type ModelContextType = {
	visible: boolean
	trackId: number | null
	userPlaylists: TUserPlaylist[]
	isLoading: boolean
	showModal: ({ trackId }: { trackId: number }) => void
	hideModal: () => void
}

export const PlaylistModalContext = createContext<ModelContextType>({
	visible: false,
	userPlaylists: [] as TUserPlaylist[],
	trackId: null,
	showModal: ({ trackId }: { trackId: number }) => {},
	isLoading: true,
	hideModal: () => {}
})

export const usePlaylistModal = (): ModelContextType => useContext(PlaylistModalContext)
