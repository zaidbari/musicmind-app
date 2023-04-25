import { colors } from '@/constants/colors'
import { PLAYLIST_TRACKS_URL } from '@/constants/urls'
import { useInfoModal } from '@/hooks/modals'
import { usePlaylistModal } from '@/hooks/modals/usePlaylistModal'
import useAxios from '@/hooks/useAxios'
import { logger } from '@/utils/logger'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export type PlaylistModalProps = {
	hideModal: () => void
}
function PlaylistModal({ hideModal }: PlaylistModalProps): JSX.Element {
	const { height, width } = useWindowDimensions()
	const { t } = useTranslation()
	const { trackId: track, userPlaylists: playlists } = usePlaylistModal()
	const { showModal } = useInfoModal()

	const api = useAxios()

	const _handlePress = async (playlistId: number) => {
		try {
			await api.post(PLAYLIST_TRACKS_URL + playlistId, { track })
			showModal({
				title: t('success'),
				content: t('notifications.trackAddedToPlaylist')
			})
		} catch (error) {
			showModal({
				title: t('error'),
				content: t('notifications.trackAlreadyInPlaylist')
			})
			logger.sentry(error, {
				tags: {
					section: 'addTrackToPlaylist'
				}
			})
		}

		// after the track is added to the playlist, hide the modal
		hideModal()
	}

	const renderSeparater = useCallback(() => <View style={styles.separater} />, [])

	return (
		<View style={[styles.container, { width, height }]}>
			<View style={[styles.contentContainer, { width: width * 0.8, height: height * 0.8 }]}>
				<View style={{ flex: 1 }}>
					<Text style={styles.title}>{t('menu.addToPlaylist')}</Text>
					<FlatList
						contentContainerStyle={{ marginBottom: 20 }}
						data={playlists}
						ItemSeparatorComponent={() => renderSeparater()}
						renderItem={({ item }) => (
							<Pressable onPress={() => _handlePress(item.id)}>
								<Text style={styles.playlistTitle}>{item.name}</Text>
								<Text style={styles.description}>{item.description}</Text>
							</Pressable>
						)}
					/>
					<Pressable onPress={hideModal} style={styles.button}>
						<Text style={styles.text}>{t('close')}</Text>
					</Pressable>
				</View>
			</View>
		</View>
	)
}

export default memo(PlaylistModal)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		position: 'absolute',
		top: 0,
		left: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentContainer: {
		backgroundColor: colors.primary,
		borderRadius: 10,
		padding: 20
	},
	title: {
		color: colors.accent,
		fontSize: 20,
		marginVertical: 10,
		fontWeight: 'bold'
	},
	description: {
		color: 'white',
		fontSize: 12,
		fontStyle: 'italic',
		marginTop: 5
	},
	playlistTitle: {
		color: 'white',
		fontSize: 16
	},
	content: {
		color: 'white',
		textAlign: 'center',
		marginVertical: 10
	},
	button: {
		width: 100,
		paddingVertical: 6,
		backgroundColor: colors.accent,
		borderRadius: 4,
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	text: {
		color: colors.primary,
		fontSize: 14,
		marginHorizontal: 8,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	separater: {
		height: 1,
		backgroundColor: colors.secondary,
		marginVertical: 10
	}
})
