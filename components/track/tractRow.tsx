import { colors } from '@/constants/colors'
import { useDevice } from '@/hooks/useDevice'
import { useTrackRow } from '@/hooks/useTrackRow'
import { TTrackRow } from '@/types/track'
import Ionicons from '@expo/vector-icons/Ionicons'
import { memo, useCallback } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'

function TrackRow({ track, index, handlePlay }: TTrackRow): JSX.Element {
	const device = useDevice()
	const { isBuffering, isPaused, isCurrentTrackSelectedForPlayback } = useTrackRow(track)

	const renderPlayPauseIcon = useCallback((): JSX.Element => {
		if (isBuffering) {
			return <ActivityIndicator size="large" color={colors.accent} />
		}

		if (isPaused) {
			return <Ionicons name="ios-pause-circle" size={34} color={colors.accent} />
		}

		return <Ionicons name="ios-play-circle" size={34} color={colors.accent} />
	}, [isBuffering, isPaused])

	return (
		<View style={styles.container}>
			<Pressable onPress={() => handlePlay(index)}>{renderPlayPauseIcon}</Pressable>
			<View style={{ flex: 1 }}>
				<Text style={[styles.title, { color: isCurrentTrackSelectedForPlayback ? colors.accent : 'white' }]}>
					{track.song_title}
				</Text>
				<Text style={styles.subTitle}>{track.artist_name}</Text>
				{device == 'phone' && (
					<Text style={{ color: isCurrentTrackSelectedForPlayback ? colors.accent : 'white' }}>{track.album_name}</Text>
				)}
			</View>
			{device !== 'phone' && (
				<View style={{ flex: 1 }}>
					<Text style={{ color: isCurrentTrackSelectedForPlayback ? colors.accent : 'white' }}>{track.album_name}</Text>
				</View>
			)}
			<View style={device !== 'phone' && { flex: 1, alignItems: 'flex-end' }}>
				<Ionicons name="ios-ellipsis-vertical-circle-outline" size={34} color={'white'} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: 18,
		marginBottom: 10,
		fontWeight: 'bold'
	},
	subTitle: {
		color: '#b3b3b3',
		fontStyle: 'italic',
		textDecorationLine: 'underline',
		textDecorationStyle: 'dashed',
		textDecorationColor: colors.accent
	}
})

export default memo(TrackRow)
