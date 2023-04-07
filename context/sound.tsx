import { TTrackItem } from '@/types/track'
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Audio, AVPlaybackStatus, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { TSoundContext, TSoundProvider } from '@/types/soundContext'
import { logger } from '@/utils/logger'

// This context will be used to store the user info.
const SoundContext = React.createContext<TSoundContext>({
	trackList: { current: null },
	currentPlayingTrack: { current: null },
	playbackStatus: {} as AVPlaybackStatus,
	_play: async () => {},
	_load: async (index: number) => {},
	_pause: async () => {},
	_stop: async () => {},
	_next: async () => {},
	_previous: async () => {},
	_toggleLoop: () => {},
	_setPosition: async (position: number) => {},
	_getPosition: async () => 0,
	_setVolume: (volume: number) => {},
	isShuffled: { current: false },
	_shuffle: () => {},
	volume: { current: 1.0 }
})

export const useSound = () => React.useContext(SoundContext)
export const SoundProvider = ({ children }: TSoundProvider): JSX.Element => {
	const soundRef = useRef<Audio.Sound>(new Audio.Sound())
	const sound = soundRef.current

	const trackList: MutableRefObject<TTrackItem[] | null> = useRef(null)
	const currentTrackIndex: MutableRefObject<number> = useRef<number>(-1)
	const currentPlayingTrack: MutableRefObject<TTrackItem | null> = useRef<TTrackItem | null>(null)
	const isLooping: MutableRefObject<boolean> = useRef<boolean>(false)
	const isShuffled: MutableRefObject<boolean> = useRef<boolean>(false)
	const volume: MutableRefObject<number> = useRef<number>(1.0)

	const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus)

	const _shuffle = useCallback(async () => {
		if (!trackList.current) return
		const shuffledTracks = trackList.current.sort(() => Math.random() - 0.5)
		trackList.current = shuffledTracks
	}, [trackList.current])

	const _getPlaybackStatus = useCallback(async () => await sound.getStatusAsync(), [])

	const _onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
		setPlaybackStatus(status)
		if (status.isLoaded) {
			if (status.didJustFinish && !status.isLooping) {
				await _next()
			}
		} else {
			if (status.error) {
				logger.log(`FATAL PLAYER ERROR: ${status.error}`)
			} else {
				logger.log('Player is not loaded')
			}
		}
	}

	const _load = async (index: number) => {
		if (!trackList.current) return
		try {
			if (currentTrackIndex.current !== index) {
				currentTrackIndex.current = index
				currentPlayingTrack.current = trackList.current[index]
				await sound.unloadAsync()
				await sound.loadAsync({ uri: trackList.current[index].track.track_file }, { shouldPlay: true }, false)
			} else _handlePlayPause()
		} catch (e) {
			logger.log(e, 'SOUND LOAD ERROR')
		}
	}

	const _handlePlayPause = useCallback(async () => {
		try {
			const status = await _getPlaybackStatus()
			if (status.isLoaded) {
				if (status.isPlaying) {
					await _pause()
				} else {
					await _play()
				}
			}
		} catch (e) {
			logger.log(e, "Couldn't play or pause")
		}
	}, [playbackStatus])

	const _play = useCallback(async () => {
		try {
			if (currentTrackIndex.current !== null) {
				await sound.playAsync()
			} else {
				await _load(0)
			}
		} catch (e) {
			logger.log(e, 'SOUND PLAY ERROR')
		}
	}, [currentTrackIndex.current])

	const _pause = useCallback(async () => {
		try {
			await sound.pauseAsync()
		} catch (e) {
			logger.log(e, 'SOUND PAUSE ERROR')
		}
	}, [])

	const _stop = useCallback(async () => {
		try {
			await sound.stopAsync()
		} catch (e) {
			logger.log(e, 'SOUND STOP ERROR')
		}
	}, [])

	const _next = useCallback(async () => {
		if (!trackList.current) return
		try {
			if (currentTrackIndex.current !== null) {
				if (currentTrackIndex.current < trackList.current.length - 1) {
					await _load(currentTrackIndex.current + 1)
				} else {
					await _load(0)
				}
			}
		} catch (e) {
			logger.log(e, 'SOUND NEXT ERROR')
		}
	}, [currentTrackIndex])

	const _previous = useCallback(async () => {
		if (!trackList.current) return

		try {
			if (currentTrackIndex !== null) {
				if (currentTrackIndex.current > 0) {
					await _load(currentTrackIndex.current - 1)
				} else {
					await _load(trackList.current.length - 1)
				}
			}
		} catch (e) {
			logger.log(e, 'SOUND PREVIOUS ERROR')
		}
	}, [currentTrackIndex.current])

	const _toggleLoop = useCallback(async () => {
		const status = await _getPlaybackStatus()

		if (status.isLoaded) {
			await sound.setIsLoopingAsync(!isLooping.current)
			isLooping.current = !isLooping.current
		}
	}, [])

	const _setPosition = useCallback(async (position: number) => {
		const status = await _getPlaybackStatus()

		if (status.isLoaded) {
			await sound.setPositionAsync(position)
		}
	}, [])

	const _getPosition = useCallback(async () => {
		const status = await _getPlaybackStatus()
		if (status.isLoaded) {
			return status.positionMillis
		}
		return 0
	}, [])

	const _setVolume = useCallback(
		async (volumeToSet: number) => {
			const status = await _getPlaybackStatus()

			if (status.isLoaded) {
				await sound.setVolumeAsync(volumeToSet)
				volume.current = volumeToSet
			}
		},
		[volume.current]
	)

	useEffect(() => {
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			staysActiveInBackground: true,
			interruptionModeIOS: InterruptionModeIOS.DuckOthers,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
			playThroughEarpieceAndroid: false
		})

		sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
	}, [])

	return (
		<SoundContext.Provider
			value={{
				trackList,
				playbackStatus,
				isShuffled,
				currentPlayingTrack,
				_load,
				_shuffle,
				_play,
				_pause,
				_stop,
				_next,
				_previous,
				_toggleLoop,
				_setPosition,
				_getPosition,
				_setVolume,
				volume
			}}
		>
			{children}
		</SoundContext.Provider>
	)
}
