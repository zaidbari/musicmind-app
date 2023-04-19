import { PlaylistDetailsCard } from '@/components/cards'
import { Loader } from '@/components/loader'
import TrackRow from '@/components/track/tractRow'
import { colors } from '@/constants/colors'
import { useSound } from '@/context/sound'
import { useGetTracks } from '@/hooks/queries'
import { TTrackItem } from '@/types/track'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet, View } from 'react-native'

const TrackScreen = (): JSX.Element => {
	const { t } = useTranslation()
	const { id } = useLocalSearchParams()
	const { tracks, isLoading, playlistDetails } = useGetTracks(id as string)
	const { trackList, _load, currentPlayingTrack } = useSound()
	const [listRef, setRef] = useState<FlatList<TTrackItem> | null>(null)

	const _handlePlayPress = (trackIndex: number) => {
		trackList.current = tracks
		_load(trackIndex)
	}

	const renderTrack = useCallback(
		({ track, index }: { track: TTrackItem; index: number }) => (
			<TrackRow index={index} track={track} handlePlay={_handlePlayPress} />
		),

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[tracks]
	)

	// Animate to current track
	useEffect(() => {
		// find index of current track
		if (!trackList.current) return
		const currentTrackIndex = trackList.current.findIndex(
			(track: TTrackItem) => track.track.id === currentPlayingTrack.current?.track.id
		)

		if (listRef && currentTrackIndex !== -1) {
			listRef.scrollToIndex({
				animated: true,
				index: currentTrackIndex,
				viewPosition: 0.5
			})
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPlayingTrack.current, listRef])

	const renderHeader = useCallback(
		() => (
			<PlaylistDetailsCard
				handlePlay={_handlePlayPress}
				playlistDetails={playlistDetails}
				tracksLength={tracks.length}
			/>
		),

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[playlistDetails, tracks.length]
	)

	const renderSeparator = useCallback(() => <View style={styles.separator} />, [])

	if (isLoading) return <Loader />
	return (
		<>
			<Stack.Screen options={{ title: t('pages.playlistTracks') as string }} />
			<View style={styles.container}>
				<FlatList
					onScrollToIndexFailed={() => {}}
					ref={ref => setRef(ref)}
					contentContainerStyle={{ paddingBottom: 30 }}
					ListHeaderComponent={renderHeader}
					data={tracks}
					initialNumToRender={20}
					keyExtractor={item => String(item.track.id)}
					renderItem={({ item, index }) =>
						renderTrack({
							track: item,
							index
						})
					}
					ItemSeparatorComponent={() => renderSeparator()}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	separator: {
		height: 1,
		marginVertical: 15,
		backgroundColor: colors.secondary
	}
})

export default TrackScreen
