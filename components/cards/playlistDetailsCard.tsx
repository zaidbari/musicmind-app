import { blurhash, colors } from '@/constants/colors'
import { useDevice } from '@/context/device'
import { TPlaylist } from '@/types/playlist'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'

type TProps = {
	playlistDetails: TPlaylist
	tracksLength: number
	handlePlay: (index: number) => void
}
const PlaylistDetailCard = ({ playlistDetails, tracksLength, handlePlay }: TProps): JSX.Element => {
	const { t } = useTranslation()
	const device = useDevice()

	return (
		<View style={StyleSheet.flatten([styles.container, device === 'phone' && { flexDirection: 'column' }])}>
			<ImageBackground
				source={{ uri: playlistDetails.Photo ?? '/assets/images/icon.png' }}
				style={styles.backgroundImage}
				resizeMode="cover"
				blurRadius={10}
			>
				<Image
					style={styles.image}
					contentFit="fill"
					source={{ uri: playlistDetails.Photo ?? '/assets/images/icon.png' }}
					transition={10}
					onError={console.error}
					placeholder={blurhash}
				/>
			</ImageBackground>

			<View style={{ flexGrow: 1 }}>
				<Text style={StyleSheet.flatten([styles.title, device === 'phone' && { textAlign: 'center' }])}>
					{playlistDetails.playlist_name}
				</Text>
				<Text style={StyleSheet.flatten([styles.subTitle, device === 'phone' && { textAlign: 'center' }])}>
					{tracksLength} {t('tracks')}
				</Text>

				<View style={StyleSheet.flatten([styles.buttonRow, device === 'phone' && { flexDirection: 'column' }])}>
					<View style={styles.buttonRow}>
						<Pressable style={styles.button} onPress={() => handlePlay(0)}>
							<Ionicons name="ios-play" size={22} color={colors.primary} />
							<Text style={styles.buttonText}>{t('play')}</Text>
						</Pressable>
						<Pressable style={styles.button}>
							<Ionicons name="ios-copy" size={20} color={colors.primary} />
							<Text style={styles.buttonText}>{t('copy')}</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</View>
	)
}

export default memo(PlaylistDetailCard)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
		padding: 20,
		backgroundColor: colors.secondary,
		borderRadius: 20,
		marginBottom: 30
	},
	backgroundImage: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 150,
		width: 150,
		borderRadius: 20,
		overflow: 'hidden'
	},
	image: {
		width: 110,
		height: 110,
		borderRadius: 110,
		borderWidth: 2,
		borderColor: colors.accent,
		borderStyle: 'solid',
		overflow: 'hidden'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white'
	},
	subTitle: {
		fontSize: 16,
		fontStyle: 'italic',
		color: 'white'
	},
	buttonRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginTop: 10
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 5,
		gap: 5,
		backgroundColor: colors.accent
	},
	buttonText: {
		fontSize: 16,
		color: colors.primary,
		fontWeight: 'bold'
	}
})
