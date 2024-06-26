import { blurhash, colors } from '@/constants/colors'
import { FALLBACK } from '@/constants/urls'
import { useInfoModal } from '@/hooks/modals/useInfoModal'
import { TPlaylist } from '@/types/playlist'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { memo, useCallback, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type TProps = {
	item: TPlaylist
	width: number
}

const PlaylistCard = ({ item, width }: TProps): JSX.Element => {
	const { showModal } = useInfoModal()
	const router = useRouter()
	const [photo, setPhoto] = useState(item.Photo ?? FALLBACK)

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
					source={{ uri: photo }}
					onError={() => setPhoto(FALLBACK)}
					placeholder={blurhash}
					transition={10}
				/>
				<View style={styles.cardContent}>
					<Text style={styles.cardText}>{item.playlist_name}</Text>
				</View>
			</Pressable>
			<Pressable
				style={styles.infoButton}
				onPress={() => showModal({ title: item.playlist_name, content: item.description })}
			>
				<Ionicons name="information-circle" size={16} color="white" />
			</Pressable>
		</View>
	)
}

export default memo(PlaylistCard)

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
