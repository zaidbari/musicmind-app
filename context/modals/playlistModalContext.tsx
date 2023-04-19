import { PlaylistModalContext } from '@/hooks/modals/usePlaylistModal'
import { useGetUserPlaylists } from '@/hooks/queries/useGetUserPlaylists'
import { ReactElement, useState } from 'react'

export const PlaylistModalProvider = ({ children }: { children: ReactElement }): JSX.Element => {
	const [visible, setVisible] = useState(false)
	const [trackId, setTrackId] = useState<number | null>(null)
	const { userPlaylists, isLoading } = useGetUserPlaylists()

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
				isLoading
			}}
		>
			{children}
		</PlaylistModalContext.Provider>
	)
}
