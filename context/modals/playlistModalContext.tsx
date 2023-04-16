import { PlaylistModalContext } from '@/hooks/modals/usePlaylistModal'
import { TUserPlaylist } from '@/types/playlist'
import { ReactElement, ReactNode, useState } from 'react'

export const PlaylistModalProvider = ({ children }: { children: ReactNode | ReactElement }): JSX.Element => {
	const [visible, setVisible] = useState(false)
	const [trackId, setTrackId] = useState<number | null>(null)
	const [userPlaylists, setUserPlaylists] = useState<TUserPlaylist[]>([] as TUserPlaylist[])

	const showModal = ({ trackId }: { trackId: number }) => {
		setVisible(true)
		setTrackId(trackId)
	}

	const hideModal = () => {
		setVisible(false)
		setTrackId(null)
	}

	return (
		<PlaylistModalContext.Provider
			value={{
				visible,
				trackId,
				userPlaylists,
				showModal,
				hideModal,
				setUserPlaylists
			}}
		>
			{children}
		</PlaylistModalContext.Provider>
	)
}
