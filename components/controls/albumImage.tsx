import { blurhash, colors } from '@/constants/colors'
import { useSound } from '@/context/sound'
import { Image } from 'expo-image'
import { memo, useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text } from 'react-native'

function AlbumImage(): JSX.Element | null {
	const { currentPlayingTrack } = useSound()
	const [uri, setUri] = useState('')
	const [shouldRender, setShouldRender] = useState(false)

	useEffect(() => {
		if (currentPlayingTrack.current) {
			setShouldRender(true)
			setUri(currentPlayingTrack.current.track.album_photo)
		} else setShouldRender(false)
	}, [currentPlayingTrack.current])

	if (!shouldRender) return null
	return (
		<ImageBackground source={{ uri }} style={styles.backgroundImage} resizeMode="cover" blurRadius={10}>
			<Image
				style={styles.image}
				contentFit="fill"
				source={{ uri }}
				transition={10}
				onError={console.error}
				placeholder={blurhash}
			/>
			<Text style={styles.title}>{currentPlayingTrack.current.track.song_title}</Text>
			<Text style={styles.artist}>{currentPlayingTrack.current.track.artist_name}</Text>
		</ImageBackground>
	)
}

export default memo(AlbumImage)

const styles = StyleSheet.create({
	backgroundImage: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20,
		width: 200,
		borderRadius: 20,
		overflow: 'hidden'
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
