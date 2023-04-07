import { useSound } from '@/context/sound'
import { TTrack, TUseTrackRowReturnType } from '@/types/track'
import { useEffect, useState } from 'react'

export function useTrackRow(track: TTrack): TUseTrackRowReturnType {
	const [isBuffering, setIsBuffering] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [isCurrentTrackSelectedForPlayback, setIsCurrentTrackSelectedForPlayback] = useState<boolean>(false)

	const { playbackStatus, currentPlayingTrack } = useSound()

	useEffect(() => {
		// ?check if the current playing track is the same as the track in the row
		if (currentPlayingTrack.current?.track.id === track.id) {
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
	}, [playbackStatus, currentPlayingTrack.current])

	// ?this hook only runs when the currentPlayingTrack.current changes
	useEffect(() => {
		if (currentPlayingTrack.current?.track.id === track.id) {
			setIsBuffering(true)
			setIsCurrentTrackSelectedForPlayback(true)
		} else {
			setIsCurrentTrackSelectedForPlayback(false)
		}
	}, [currentPlayingTrack.current])

	return { isBuffering, isPaused, isCurrentTrackSelectedForPlayback }
}
