export type TTrackItem = {
	id: number
	playlist: number
	position: number
	track: TTrack
}

export type TTrack = {
	id: number
	album: number
	album_name: string
	album_photo: string
	artist: number
	artist_name: string
	song_title: string
	soundsource_id: string
	track_file: string
}

export type TTrackRow = {
	track: TTrack
	index: number
	handlePlay: (index: number) => void
}

export type TUseTrackRowReturnType = {
	isBuffering: boolean
	isPaused: boolean
	isCurrentTrackSelectedForPlayback: boolean
}
