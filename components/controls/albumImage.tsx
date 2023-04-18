import { blurhash, colors } from '@/constants/colors'
import { useSound } from '@/context/sound'
import { Image } from 'expo-image'
import { memo, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AlbumImage = (): JSX.Element | null => {
	const { currentPlayingTrack } = useSound()
	const [uri, setUri] = useState('')
	const [shouldRender, setShouldRender] = useState(false)

	useEffect(() => {
		if (currentPlayingTrack.current) {
			setShouldRender(true)
			setUri(currentPlayingTrack.current.track.album_photo)
		} else setShouldRender(false)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPlayingTrack.current])

	if (!shouldRender) return null
	return (
		<View style={styles.backgroundImage}>
			<Image
				style={styles.image}
				contentFit="cover"
				source={{ uri }}
				transition={10}
				onError={() => console.log('error image')}
				placeholder={blurhash}
			/>
			<Text style={styles.title}>{currentPlayingTrack.current.track.song_title}</Text>
			<Text style={styles.artist}>{currentPlayingTrack.current.track.artist_name}</Text>
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
		width: 140,
		height: 140,
		borderRadius: 140,
		borderWidth: 2,
		borderColor: colors.accent,
		borderStyle: 'solid',
		overflow: 'hidden'
	},
	title: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
		marginTop: 10,
		textAlign: 'center'
	},
	artist: {
		color: 'white',
		fontSize: 14,
		textAlign: 'center'
	}
})
