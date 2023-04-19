import { blurhash, colors } from '@/constants/colors'
import { useInfoModal } from '@/hooks/modals/useInfoModal'
import { Container } from '@/types/container'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { memo, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
type TProps = { item: Container; width: number }

const ContainerCard = ({ item, width }: TProps): JSX.Element => {
	const { showModal } = useInfoModal()
	const [photo, setPhoto] = useState(item.Photo ?? '/assets/images/icon.png')

	return (
		<View style={{ flex: 1, width, position: 'relative' }}>
			<Link href={`/playlist/${item.id}`} style={{ marginBottom: 20 }}>
				<Image
					placeholder={blurhash}
					transition={10}
					source={{ uri: photo }}
					onError={() => setPhoto('/assets/images/icon.png')}
					style={StyleSheet.flatten([styles.image, { width, height: width }])}
					contentFit={'fill'}
				/>
			</Link>
			<Pressable style={styles.infoButton} onPress={() => showModal({ title: item.name, content: item.description })}>
				<Ionicons name="information-circle" size={16} color="white" />
			</Pressable>
		</View>
	)
}

export default memo(ContainerCard)

const styles = StyleSheet.create({
	image: {
		flex: 1,
		borderRadius: 10
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
