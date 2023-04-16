import { TUserPlaylist } from '@/types/playlist'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export type ModelContextType = {
	visible: boolean
	trackId: number | null
	userPlaylists: TUserPlaylist[]
	setUserPlaylists: Dispatch<SetStateAction<TUserPlaylist[]>>
	showModal: ({ trackId }: { trackId: number }) => void
	hideModal: () => void
}

export const PlaylistModalContext = createContext<ModelContextType>({
	visible: false,
	userPlaylists: [] as TUserPlaylist[],
	trackId: null,
	showModal: ({ trackId }: { trackId: number }) => {},
	setUserPlaylists: () => {},
	hideModal: () => {}
})

export const usePlaylistModal = (): ModelContextType => useContext(PlaylistModalContext)
