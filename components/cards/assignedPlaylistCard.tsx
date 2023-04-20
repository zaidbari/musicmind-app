import { blurhash, colors } from '@/constants/colors'
import { FALLBACK } from '@/constants/urls'
import { useAuth } from '@/context/auth'
import { TCopiedPlaylists } from '@/types/playlist'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { memo, useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type TProps = {
	item: TCopiedPlaylists
	width: number
	deleteUserPlaylist: (id: number, type: 'assigned' | 'user') => void
}

const AssignedPlaylistCard = ({ item, width, deleteUserPlaylist }: TProps): JSX.Element => {
	const router = useRouter()
	const { isAdmin } = useAuth()

	const _handlePress = useCallback(async () => {
		try {
			await AsyncStorage.setItem('@playlist', JSON.stringify(item))
			router.push(`/tracks/${item.playlist}`)
		} catch (error) {
			console.error(error)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item.playlist])

	return (
		<View style={{ flex: 1, minHeight: width, position: 'relative' }}>
			<Pressable onPress={_handlePress} style={styles.card}>
				<Image
					style={StyleSheet.flatten([styles.image, { width: '100%', minHeight: width, maxHeight: width }])}
					contentFit={'fill'}
					source={{ uri: FALLBACK }}
					placeholder={blurhash}
					transition={10}
				/>
				<View style={styles.cardContent}>
					<Text style={styles.cardText}>{item.playlist_name}</Text>
				</View>
			</Pressable>
			{(isAdmin || item.is_allowed_to_be_removed) && (
				// FIXME: Check if this is the correct id to pass or do we need to pass in item.playlist?
				<Pressable style={styles.infoButton} onPress={() => deleteUserPlaylist(item.id, 'assigned')}>
					<Ionicons name="ios-trash-outline" size={16} color="white" />
				</Pressable>
			)}
		</View>
	)
}

export default memo(AssignedPlaylistCard)

const styles = StyleSheet.create({
	image: {
		flex: 1,
		borderRadius: 10
	},
	card: {
		borderRadius: 10,
		backgroundColor: colors.secondary,
		marginBottom: 20,
		flex: 1
	},
	cardContent: {
		paddingHorizontal: 15,
		marginVertical: 20,
		width: '100%'
	},
	cardText: {
		color: 'white',
		textAlign: 'center'
	},
	infoButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		backgroundColor: colors.primary,
		padding: 10,
		borderBottomLeftRadius: 10
	}
})
