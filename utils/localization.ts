import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: {
				signin: 'Sign In',
				auth_empty_fields: 'Email and password is required!',
				reset: 'Reset',
				categories: 'Categories',
				close: 'Close',
				tracks: 'Tracks',
				play: 'Play',
				copy: 'Copy',
				noItems: 'No items found',
				success: 'Success',
				error: 'Error',
				actions: 'Actions',
				notifications: {
					addedToQueue: 'Added to queue',
					alreadyInQueue: 'Track already in queue'
				},
				inputs: {
					username: 'Username',
					password: 'Password',
					search: 'Search',
					searchPlaylists: 'Search playlists',
					searchPreMadePlaylists: 'Search pre-made playlists'
				},
				pages: {
					home: 'Home',
					internalContainers: 'Internal containers',
					myPlaylists: 'My playlists',
					createPlaylist: 'Create playlist',
					playlist: 'Playlist',
					playlistTracks: 'Playlist tracks',
					newsfeed: 'News Feed',
					internalPlaylist: 'Internal playlists'
				},
				menu: {
					addToPlaylist: 'Add to playlist',
					addToQueue: 'Add to queue',
					tour: 'Guided Tour'
				},
				'No active account found with the given credentials!': 'No active account found with the given credentials!'
			}
		},
		// danish
		da: {
			translation: {
				signin: 'Log ind',
				auth_empty_fields: 'Venligst indtast brugernavn og adgangskode!',
				reset: 'Nulstil',
				categories: 'Kategorier',
				close: 'Luk',
				tracks: 'Numre',
				play: 'Afspil',
				copy: 'Kopier',
				noItems: 'Ingen elementer fundet',
				success: 'Succes',
				error: 'Fejl',
				actions: 'Handlinger',
				notifications: {
					addedToQueue: 'Tilføjet til kø',
					alreadyInQueue: 'Nummeret er allerede i køen'
				},
				inputs: {
					username: 'Brugernavn',
					password: 'Kodeord',
					search: 'Søg',
					searchPlaylists: 'Søg spillelister',
					searchPreMadePlaylists: 'Søg præoprettet spillelister'
				},
				pages: {
					home: 'Hjem',
					internalContainers: 'Internt Miljø',
					myPlaylists: 'Mine spillelister',
					createPlaylist: 'Opret spilleliste',
					playlist: 'Spillelister',
					playlistTracks: 'Spillelister numre',
					newsfeed: 'Nyhedsstrøm',
					internalPlaylist: 'Internt spillelister'
				},
				menu: {
					addToPlaylist: 'Tilføj til spilleliste',
					addToQueue: 'Tilføj til kø',
					tour: 'Rundvisning'
				},
				'No active account found with the given credentials!': 'Ingen aktive brugere fundet med de givne oplysninger!'
			}
		}
	},
	fallbackLng: 'da',
	interpolation: {
		escapeValue: false
	},
	react: { useSuspense: false }
})

export default i18n
