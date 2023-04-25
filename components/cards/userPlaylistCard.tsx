import { TUserPlaylist } from '@/types/playlist'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from '../buttons/iconButton'
import { useInfoModal } from '@/hooks/modals'

export const UserPlaylistCard = ({
	item,
	deleteUserPlaylist
}: {
	item: TUserPlaylist
	deleteUserPlaylist: (id: number, type: 'assigned' | 'user') => void
}) => {
	const { showModal } = useInfoModal()

	return (
		<View style={styles.row}>
			<View>
				<Text style={styles.playlistTitle}>{item.name}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>
			<View style={styles.row}>
				<IconButton icon="ios-pencil" onPress={() => showModal({ title: 'Success', content: 'Comnet' })} />
				<IconButton icon="ios-trash-outline" onPress={() => deleteUserPlaylist(item.id, 'user')} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
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
	}
})
