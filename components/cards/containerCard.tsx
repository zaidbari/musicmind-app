import { blurhash, colors } from '@/constants/colors'
import { useModal } from '@/hooks/useModal'
import { Container } from '@/types/container'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { memo } from 'react'
import { Pressable, StyleSheet } from 'react-native'

function ContainerCard({ item }: { item: Container }): JSX.Element {
	const { showModal } = useModal()

	return (
		<>
			<Link href={`container/${item.id}`} style={{ marginBottom: 20 }}>
				<Image
					placeholder={blurhash}
					transition={10}
					source={{ uri: item.Photo }}
					style={styles.image}
					contentFit={'cover'}
				/>
			</Link>
			<Pressable style={styles.infoButton} onPress={() => showModal({ title: item.name, content: item.description })}>
				<Ionicons name="information-circle" size={16} color="white" />
			</Pressable>
		</>
	)
}

export default memo(ContainerCard)

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: '100%',
		height: 260,
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
