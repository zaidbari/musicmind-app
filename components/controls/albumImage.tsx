import { blurhash, colors } from '@/constants/colors'
import { FALLBACK } from '@/constants/urls'
import { useSound } from '@/context/sound'
import { Image } from 'expo-image'
import { memo, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AlbumImage = (): JSX.Element | null => {
	const { currentPlayingTrack } = useSound()
	const [photo, setPhoto] = useState(FALLBACK)
	const [shouldRender, setShouldRender] = useState(false)
	useEffect(() => {
		if (currentPlayingTrack.current) {
			setShouldRender(true)
			setPhoto(currentPlayingTrack.current.track.album_photo ?? FALLBACK)
		} else setShouldRender(false)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPlayingTrack.current])

	if (!shouldRender) return null
	return (
		<View style={styles.backgroundImage}>
			<Image
				style={styles.image}
				contentFit="cover"
				source={{ uri: photo }}
				transition={10}
				onError={() => setPhoto(FALLBACK)}
				placeholder={blurhash}
			/>
			<Text numberOfLines={1} style={styles.title}>
				{currentPlayingTrack.current.track.song_title}
			</Text>
			<Text numberOfLines={1} style={styles.artist}>
				{currentPlayingTrack.current.track.artist_name}
			</Text>
		</View>
	)
}

export default memo(AlbumImage)

const styles = StyleSheet.create({
	backgroundImage: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 250,
		gap: 10
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: colors.accent,
		borderStyle: 'solid',
		overflow: 'hidden'
	},
	title: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 12,
		marginTop: 10,
		textAlign: 'center'
	},
	artist: {
		color: 'white',
		fontSize: 12,
		textAlign: 'center'
	}
})
