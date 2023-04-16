import { colors } from '@/constants/colors'
import { usePlaylistModal } from '@/hooks/modals/usePlaylistModal'
import { logger } from '@/utils/logger'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export type PlaylistModalProps = {
	hideModal: () => void
}
function PlaylistModal({ hideModal }: PlaylistModalProps): JSX.Element {
	const { height, width } = useWindowDimensions()
	const { t } = useTranslation()
	const { trackId, userPlaylists: playlists } = usePlaylistModal()

	const _handlePress = (playlistId: number) => {
		//TODO: Playlist track assignment code goes here
		logger.log(playlistId, trackId)

		// after the track is added to the playlist, hide the modal
		hideModal()
	}

	return (
		<View style={[styles.container, { width, height }]}>
			<View style={[styles.contentContainer, { width: width / 1.3 }]}>
				<View style={{ flex: 1 }}>
					<Text style={styles.title}>Add to playlist</Text>
					<FlatList
						data={playlists}
						ItemSeparatorComponent={() => (
							<View style={{ height: 1, backgroundColor: colors.secondary, marginVertical: 10 }} />
						)}
						renderItem={({ item }) => (
							<Pressable onPress={() => _handlePress(item.id)}>
								<Text style={{ color: 'white', fontSize: 16 }}>{item.name}</Text>
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
	}
})