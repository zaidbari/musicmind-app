import { useSound } from '@/context/sound'
import { useEffect, useState } from 'react'

export function useTrackControls() {
	const [isBuffering, setIsBuffering] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { playbackStatus, currentPlayingTrack } = useSound()

	useEffect(() => {
		if (currentPlayingTrack.current !== null && !playbackStatus.isLoaded) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}

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
	}, [playbackStatus, currentPlayingTrack])

	// ?this hook only runs when the currentPlayingTrack.current changes
	useEffect(() => {
		setIsBuffering(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPlayingTrack.current])

	return { isBuffering, isPaused, isLoading }
}
