import { blurhash, colors } from '@/constants/colors'
import { useInfoModal } from '@/hooks/modals/useInfoModal'
import { Container } from '@/types/container'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { memo } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

function ContainerCard({ item, width }: { item: Container; width: number }): JSX.Element {
	const { showModal } = useInfoModal()

	return (
		<View style={{ flex: 1, width, position: 'relative' }}>
			<Link href={`container/${item.id}`} style={{ marginBottom: 20 }}>
				<Image
					placeholder={blurhash}
					transition={10}
					source={{ uri: item.Photo }}
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
