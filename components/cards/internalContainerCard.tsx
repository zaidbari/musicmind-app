import { blurhash, colors } from '@/constants/colors'
import { FALLBACK } from '@/constants/urls'
import { useInfoModal } from '@/hooks/modals/useInfoModal'
import { Container } from '@/types/container'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { memo, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type TProps = {
	item: Container
	width: number
}

const InternalContainerCard = ({ item, width }: TProps): JSX.Element => {
	const { showModal } = useInfoModal()
	const [photo, setPhoto] = useState(item.Photo ?? FALLBACK)

	return (
		<View style={{ flex: 1, position: 'relative' }}>
			<Link href={`/internal-playlists/${item.id}`} style={styles.card}>
				<Image
					style={StyleSheet.flatten([styles.image, { width: '100%', minHeight: width, maxHeight: width }])}
					contentFit={'fill'}
					source={{ uri: photo }}
					onError={() => setPhoto(FALLBACK)}
					placeholder={blurhash}
					transition={10}
				/>
				<View style={styles.cardContent}>
					<Text style={styles.cardText}>{item.name}</Text>
				</View>
			</Link>
			<Pressable style={styles.infoButton} onPress={() => showModal({ title: item.name, content: item.description })}>
				<Ionicons name="information-circle" size={16} color="white" />
			</Pressable>
		</View>
	)
}

export default memo(InternalContainerCard)

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
