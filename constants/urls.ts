import { Platform } from 'react-native'

export const SENTRY_DSN = 'https://2ad40b193c3d441bbecfa28c0fc6ecdb@o1228491.ingest.sentry.io/6374247'

export const URL = 'https://www.musicminduat.dk'

export const CORS_URL = 'https://www.musicmind-cors.dk/'
export const BASE_API_URL = Platform.OS === 'web' ? CORS_URL + URL : URL

export const LOGIN_URL = BASE_API_URL + '/api/token/obtain/'
export const REFRESH_URL = BASE_API_URL + '/api/token/refresh/'

export const MAIN_CONTAINER_URL = BASE_API_URL + '/music/ContainerGroups/'

export const PLAYLIST_GROUP_URL = BASE_API_URL + '/music/PlaylistGroups/'
export const PLAYLIST_TRACKS_URL = BASE_API_URL + '/music/musicmind-playlist/tracks/'

export const CREATE_PLAYLIST_URL = BASE_API_URL + '/music/playlist'
export const USER_PLAYLIST_URL = BASE_API_URL + '/music/playlist'

export const TIMER_ACQUISITION_URL = BASE_API_URL + '/music/timer-acquisition/'
export const MEDIAPLAYER_ACQUISITION_URL = BASE_API_URL + '/music/mediaplayer-acquisition/'

export const INTERNAL_CONTAINER_URL = BASE_API_URL + '/music/InternalContainerGroups/'
export const INTERNAL_URL = BASE_API_URL + '/music/Internal/'
export const INTERNAL_PLAYLIST_GROUP_URL = BASE_API_URL + '/music/InternalPlaylistGroups/'

export const SEARCH_URL = BASE_API_URL + '/music/musicmindsearch/'
export const ARTIST_TRACKS_URL = BASE_API_URL + '/music/musicmind-artist/'
export const ALBUM_TRACKS_URL = BASE_API_URL + '/music/musicmind-album/'

export const PLAYLIST_TRACKS_EDIT_URL = BASE_API_URL + '/music/musicmind-playlist/tracks/edit/'

export const COPYPLAYLIST_ASSIGNED_URL = BASE_API_URL + '/music/copy-playlist-assigned/'
export const REVERSEUSERLOOKUP_URL = BASE_API_URL + '/music/reverse-userlookup/'
export const ASSIGNED_URL = BASE_API_URL + '/music/assigned/'

export const USERTYPE_URL = BASE_API_URL + '/api/user-type/'
export const USERNAME_URL = BASE_API_URL + '/api/user-name/'

export const CHANGEPASS_URL = BASE_API_URL + '/api/change_password/'
export const CREATEUSER_URL = BASE_API_URL + '/api/user/create/'
export const USERLIST_URL = BASE_API_URL + '/api/user-list/'
export const USERLISTSOONTOEXPIRE_URL = BASE_API_URL + '/api/user-soon-expire/'
export const USERLISTDEACTIVATED_URL = BASE_API_URL + '/api/user-deaktivated/'
export const ROYALTY_LOGGING_URL = BASE_API_URL + '/music/Logging/'
export const IMAGES = BASE_API_URL + '/images/'
export const SONGREQUEST = BASE_API_URL + '/music/songrequest/'
export const NEWS_FEED_URL = BASE_API_URL + '/music/news/'
export const FEEDBACKREQUEST_URL = BASE_API_URL + '/music/feedbackrequest/'
export const NEWS_ENGAGEMENT_URL = BASE_API_URL + '/music/news-engagement/'

export const SHOULD_APP_WORK = BASE_API_URL + '/music/android-should-work/'

export const MUSICTHERAPISTS_URL = BASE_API_URL + '/music/musictherapists/'
export const FALLBACK = '/assets/images/icon.png'
