import { PlaylistDetailsCard } from '@/components/cards'
import { Loader } from '@/components/loader'
import TrackRow from '@/components/track/tractRow'
import { colors } from '@/constants/colors'
import { useSound } from '@/context/sound'
import { usePlaylistModal } from '@/hooks/modals'
import { useGetTracks } from '@/hooks/queries'
import { TTrackItem } from '@/types/track'
import { Stack, useSearchParams } from 'expo-router'
import { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet, View } from 'react-native'

const TrackScreen: FC<{}> = (): JSX.Element => {
	const { t } = useTranslation()
	const { id } = useSearchParams()

	const { tracks, isLoading, playlistDetails, userPlaylists } = useGetTracks(id as string)
	const { trackList, _load } = useSound()
	const { setUserPlaylists } = usePlaylistModal()

	useEffect(() => {
		if (userPlaylists.length) setUserPlaylists(userPlaylists)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userPlaylists])

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
					contentContainerStyle={{ paddingBottom: 30 }}
					ListHeaderComponent={renderHeader}
					data={tracks}
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
