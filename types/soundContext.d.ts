type TSoundProvider = {
	children: React.ReactNode
}

export type TSoundContext = {
	trackList: MutableRefObject<TTrackItem[] | null>
	currentPlayingTrack: MutableRefObject<TTrackItem | null>
	playbackStatus: AVPlaybackStatus
	_play: () => Promise<void>
	_load: (index: number) => Promise<void>
	_pause: () => Promise<void>
	_stop: () => Promise<void>
	_next: () => Promise<void>
	_previous: () => Promise<void>
	_toggleLoop: () => void
	_setPosition: (position: number) => Promise<void>
	_getPosition: () => Promise<number>
	_setVolume: (volume: number) => void
	isShuffled: MutableRefObject<boolean>
	volume: MutableRefObject<number>
	_shuffle: () => void
}
