import { useSound } from '@/context/sound'
import { useEffect, useState } from 'react'

export function useTrackControls() {
	const [isBuffering, setIsBuffering] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	const { playbackStatus, currentPlayingTrack } = useSound()

	useEffect(() => {
		// ?check if the current playing track is the same as the track in the row
		if (playbackStatus.isLoaded) {
			/**
			 * ?By default buffering is set to true when a new track is clicked by the user
			 * ?and is set to false when the track is loaded and ready to play
			 */
			setIsBuffering(false)
			if (playbackStatus.isPlaying) {
				setIsPaused(true)
			} else {
				setIsPaused(false)
			}
		}
	}, [playbackStatus])

	// ?this hook only runs when the currentPlayingTrack.current changes
	useEffect(() => {
		setIsBuffering(true)
	}, [currentPlayingTrack.current])

	return { isBuffering, isPaused }
}
