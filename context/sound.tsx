import { TTrackItem } from '@/types/track'
import { MutableRefObject, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Audio, AVPlaybackStatus, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { TSoundContext, TSoundProvider } from '@/types/soundContext'
import { logger } from '@/utils/logger'
import useAxios from '@/hooks/useAxios'
import axios from 'axios'
import { ROYALTY_LOGGING_URL } from '@/constants/urls'
import { useGetPlayerSettings } from '@/hooks/queries/useGetPlayerSettings'

// This context will be used to store the user info.
const SoundContext = createContext<TSoundContext>({
	trackList: { current: null },
	currentPlayingTrack: { current: null },
	playbackStatus: {} as AVPlaybackStatus,
	_play: async () => {},
	_load: async (index: number) => {},
	_unload: async () => {},
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
	currentTrackIndex: { current: -1 },
	volume: { current: 1.0 },
	mediaPlayerAcquisition: { isShuffleBtnVisible: false, isRepeatBtnVisible: false },
	timerAcquisition: { timer_value_integer: 0, timer_enabled_bool: false },
	isTimerEnabled: false,
	setTimerEnabled: () => {},
	timerCount: 3600,
	setTimer: () => {}
})

export const useSound = () => useContext(SoundContext)

export function SoundProvider({ children }: TSoundProvider): JSX.Element {
	const api = useAxios()

	const { mediaPlayerAcquisition, timerAcquisition } = useGetPlayerSettings()

	const trackList: MutableRefObject<TTrackItem[] | null> = useRef(null)
	const currentTrackIndex: MutableRefObject<number> = useRef<number>(-1)
	const currentPlayingTrack: MutableRefObject<TTrackItem | null> = useRef<TTrackItem | null>(null)
	const isLooping: MutableRefObject<boolean> = useRef<boolean>(false)
	const isShuffled: MutableRefObject<boolean> = useRef<boolean>(false)
	const volume: MutableRefObject<number> = useRef<number>(1.0)
	const soundRef = useRef<Audio.Sound>(new Audio.Sound())
	const sound = soundRef.current

	const [isTimerEnabled, setTimerEnabled] = useState<boolean>(false)
	const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus)

	const [timerCount, setTimer] = useState(3600)

	useEffect(() => {
		if (timerAcquisition.timer_enabled_bool) {
			setTimerEnabled(true)
			setTimer(timerAcquisition.timer_value_integer * 60)
		}
	}, [timerAcquisition])

	// stop music when timer reaches zero

	const postRoyaltyLogging = async (id: number) => {
		let source = axios.CancelToken.source()

		try {
			await api.post(ROYALTY_LOGGING_URL + id, {}, { cancelToken: source.token })
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: 'postRoyaltyLogging'
				}
			})
		}
	}

	const _unload = async () => {
		try {
			await sound.unloadAsync()
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: '_unload'
				}
			})
		}
	}

	const _shuffle = useCallback(() => {
		if (!trackList.current) return
		const shuffledTracks = trackList.current.sort(() => Math.random() - 0.5)
		trackList.current = shuffledTracks

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trackList.current])

	const _getPlaybackStatus = useCallback(async () => await sound.getStatusAsync(), [sound])

	const _onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
		setPlaybackStatus(status)
		if (status.isLoaded) {
			if (status.didJustFinish && !status.isLooping) {
				await _next()
			}
		} else {
			if (status.error) {
				logger.sentry(status.error, {
					tags: {
						section: '_onPlaybackStatusUpdate'
					}
				})
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
				await sound.loadAsync(
					{ uri: trackList.current[index].track.track_file },
					{ shouldPlay: true, volume: volume.current },
					false
				)
				//?INFO: Music player aquisition end point goes here and is disabled in development mode
				if (process.env.NODE_ENV === 'production') await postRoyaltyLogging(trackList.current[index].track.id)
			} else _handlePlayPause()
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: '_load'
				}
			})
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
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: '_handlePlayPause'
				}
			})
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playbackStatus])

	const _play = useCallback(async () => {
		try {
			if (currentTrackIndex.current !== null) {
				await sound.playAsync()
			} else {
				await _load(0)
			}
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: '_play'
				}
			})
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTrackIndex.current])

	const _pause = useCallback(async () => {
		try {
			await sound.pauseAsync()
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: '_pause'
				}
			})
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const _stop = useCallback(async () => {
		try {
			await sound.stopAsync()
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: '_stop'
				}
			})
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const _next = useCallback(async () => {
		if (!trackList.current || !playbackStatus.isLoaded) return
		try {
			if (currentTrackIndex.current !== null) {
				if (currentTrackIndex.current < trackList.current.length - 1) {
					await _load(currentTrackIndex.current + 1)
				} else {
					await _load(0)
				}
			}
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: '_next'
				}
			})
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTrackIndex, playbackStatus.isLoaded])

	const _previous = useCallback(async () => {
		if (!trackList.current || !playbackStatus.isLoaded) return

		try {
			if (currentTrackIndex !== null) {
				if (currentTrackIndex.current > 0) {
					await _load(currentTrackIndex.current - 1)
				} else {
					await _load(trackList.current.length - 1)
				}
			}
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: '_previous'
				}
			})
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTrackIndex.current, playbackStatus.isLoaded])

	const _toggleLoop = useCallback(async () => {
		const status = await _getPlaybackStatus()

		if (status.isLoaded) {
			await sound.setIsLoopingAsync(!isLooping.current)
			isLooping.current = !isLooping.current
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const _setPosition = useCallback(async (position: number) => {
		const status = await _getPlaybackStatus()

		if (status.isLoaded) {
			await sound.setPositionAsync(position)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const _getPosition = useCallback(async () => {
		const status = await _getPlaybackStatus()
		if (status.isLoaded) {
			return status.positionMillis
		}
		return 0
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const _setVolume = useCallback(
		async (volumeToSet: number) => {
			const status = await _getPlaybackStatus()

			if (status.isLoaded) {
				await sound.setVolumeAsync(volumeToSet)
				volume.current = volumeToSet
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (isTimerEnabled && currentTrackIndex.current !== -1) {
			const timer = setInterval(() => setTimer(prev => prev - 1), 1000)

			if (timerCount <= 0) {
				setTimer(0)
				_pause()
				setTimerEnabled(false)
				clearInterval(timer)
			}

			return () => clearInterval(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isTimerEnabled, timerCount, currentTrackIndex.current])

	return (
		<SoundContext.Provider
			value={{
				trackList,
				playbackStatus,
				isShuffled,
				currentPlayingTrack,
				currentTrackIndex,
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
				volume,
				mediaPlayerAcquisition,
				timerAcquisition,
				isTimerEnabled,
				timerCount,
				setTimer,
				_unload,
				setTimerEnabled
			}}
		>
			{children}
		</SoundContext.Provider>
	)
}
