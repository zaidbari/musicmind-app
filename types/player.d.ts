export type TPlaybackStatus = {
	isLooping: number
	isMuted: boolean
	positionMillis: number
	durationMillis: number
	shouldPlay: boolean
	isPlaying: boolean
	isBuffering: boolean
	isLoaded: boolean
	shouldCorrectPitch: boolean
	volume: number
	rate: number
	didJustFinish: boolean
	progressUpdateIntervalMillis?: number
	error?: string
}
