import { colors } from '@/constants/colors'
import { useSound } from '@/context/sound'
import { TTrackItem, TUseTrackRowReturnType } from '@/types/track'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useEffect, useState } from 'react'
import { useInfoModal } from '../modals/useInfoModal'
import { useTranslation } from 'react-i18next'
import { usePlaylistModal } from '../modals/usePlaylistModal'

export const useTrackRow = (track: TTrackItem): TUseTrackRowReturnType => {
	const [isBuffering, setIsBuffering] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [isCurrentTrackSelectedForPlayback, setIsCurrentTrackSelectedForPlayback] = useState<boolean>(false)
	const { showModal: showPlaylistModal } = usePlaylistModal()
	const { showModal } = useInfoModal()
	const { t } = useTranslation()

	const { playbackStatus, currentPlayingTrack, trackList } = useSound()

	const { showActionSheetWithOptions } = useActionSheet()

	const options = [t('menu.addToQueue'), t('menu.addToPlaylist'), t('close')]
	const cancelButtonIndex = options.length - 1

	const onPress = () => {
		showActionSheetWithOptions(
			{
				options,
				title: track.track.song_title,
				message: 'By ' + track.track.artist_name,
				userInterfaceStyle: 'dark',
				showSeparators: true,
				cancelButtonTintColor: colors.accent,
				messageTextStyle: {
					color: 'white',
					fontSize: 12,
					fontStyle: 'italic'
				},
				containerStyle: {
					backgroundColor: colors.primary
				},
				separatorStyle: {
					backgroundColor: colors.secondary
				},
				titleTextStyle: {
					color: colors.accent,
					fontWeight: 'bold',
					fontSize: 20
				},
				textStyle: {
					color: 'white',
					fontSize: 16
				},
				useModal: true,
				cancelButtonIndex
			},
			(selectedIndex?: number) => {
				switch (selectedIndex) {
					case 0:
						// check if trackList.current is null
						if (!trackList.current) {
							trackList.current = [track]
							showModal({ title: t('success') as string, content: t('notifications.addedToQueue') as string })
							return
						}

						// check if the track is already in the queue
						const isTrackInQueue = trackList.current.find((item: TTrackItem) => item.track.id === track.track.id)
						if (isTrackInQueue) {
							showModal({ title: t('error') as string, content: t('notifications.alreadyInQueue') as string })
							return
						}
						trackList.current = [...trackList.current, track]
						showModal({ title: t('success') as string, content: t('notifications.addedToQueue') as string })

						break
					case 1:
						showPlaylistModal({ trackId: track.track.id })
						break
					case cancelButtonIndex:
					// Canceled
				}
			}
		)
	}

	useEffect(() => {
		// ?check if the current playing track is the same as the track in the row
		if (currentPlayingTrack.current?.track.id === track.track.id) {
			if (playbackStatus.isLoaded) {
				/**
				 * ?By default buffering is set to truw when a new track is clicked by the user
				 * ?and is set to false when the track is loaded and ready to play
				 */
				setIsBuffering(false)
				if (playbackStatus.isPlaying) {
					setIsPaused(true)
				} else {
					setIsPaused(false)
				}
			}
		} else {
			setIsPaused(false)
			setIsBuffering(false)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playbackStatus, currentPlayingTrack.current])

	// ?this hook only runs when the currentPlayingTrack.current changes
	useEffect(() => {
		if (currentPlayingTrack.current?.track.id === track.track.id) {
			setIsBuffering(true)
			setIsCurrentTrackSelectedForPlayback(true)
		} else {
			setIsCurrentTrackSelectedForPlayback(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPlayingTrack.current])

	return { isBuffering, isPaused, isCurrentTrackSelectedForPlayback, onPress }
}
