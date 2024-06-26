import { colors } from '@/constants/colors'
import { useDevice } from '@/context/device'
import { useTrackRow } from '@/hooks/tracks/useTrackRow'
import { TTrackRow } from '@/types/track'
import Ionicons from '@expo/vector-icons/Ionicons'
import { memo, useCallback } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'

const TrackRow = ({ track, index, handlePlay }: TTrackRow): JSX.Element => {
	const device = useDevice()
	const { isBuffering, isPaused, isCurrentTrackSelectedForPlayback, onPress } = useTrackRow(track)

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
					{track.track.song_title}
				</Text>
				<Text style={styles.subTitle}>{track.track.artist_name}</Text>
				{device === 'phone' && (
					<Text style={{ color: isCurrentTrackSelectedForPlayback ? colors.accent : 'white', marginTop: 10 }}>
						{track.track.album_name}
					</Text>
				)}
			</View>
			{device !== 'phone' && (
				<View style={{ flex: 1 }}>
					<Text style={{ color: isCurrentTrackSelectedForPlayback ? colors.accent : 'white' }}>
						{track.track.album_name}
					</Text>
				</View>
			)}
			<Pressable onPress={onPress} style={device !== 'phone' && { flex: 1, alignItems: 'flex-end' }}>
				{({ pressed }) => (
					<Ionicons name="ios-ellipsis-vertical-circle-outline" size={34} color={pressed ? colors.accent : 'white'} />
				)}
			</Pressable>
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
		fontSize: 16,
		marginBottom: 10,
		fontWeight: 'bold'
	},
	subTitle: {
		color: 'rgba(255,255,255,0.8)',
		fontStyle: 'italic',
		textDecorationLine: 'underline',
		textDecorationStyle: 'solid',
		textDecorationColor: colors.accent
	}
})

export default memo(TrackRow)
