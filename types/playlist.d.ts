export type TPlaylist = {
	id: number
	Photo: string
	playlist: number
	description: string
	container_group: number
	music_therapist: number
	music_therapist_name: string
	playlist_name: string
	position: number
}

export type TUserPlaylist = {
	id: number
	Photo: string
	description: string
	name: string
	theme: string | null
	visibility: number
}
