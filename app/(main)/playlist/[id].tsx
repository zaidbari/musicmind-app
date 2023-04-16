import PlaylistDetailsCard from '@/components/cards/playlistDetailsCard'
import { Loader } from '@/components/loader'
import PlaylistModal from '@/components/models/playlist'
import TrackRow from '@/components/track/tractRow'
import { colors } from '@/constants/colors'
import { useSound } from '@/context/sound'
import { usePlaylistModal } from '@/hooks/modals/usePlaylistModal'
import { useGetTracks } from '@/hooks/queries/useGetTracks'
import { TTrackItem } from '@/types/track'
import { FlashList } from '@shopify/flash-list'
import { Stack, useSearchParams } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

export default function TrackScreen() {
	const { t } = useTranslation()
	const { id } = useSearchParams()

	const { tracks, isLoading, playlistDetails, userPlaylists } = useGetTracks(id as string)
	const { trackList, _load } = useSound()
	const { setUserPlaylists } = usePlaylistModal()

	useEffect(() => {
		if (userPlaylists.length === 0) return
		setUserPlaylists(userPlaylists)
	}, [userPlaylists])

	const _handlePlayPress = (trackIndex: number) => {
		trackList.current = tracks
		_load(trackIndex)
	}

	const renderTrack = useCallback(
		({ track, index }: { track: TTrackItem; index: number }) => (
			<TrackRow index={index} track={track} handlePlay={_handlePlayPress} />
		),
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
		[tracks]
	)

	if (isLoading) return <Loader />
	return (
		<>
			<Stack.Screen options={{ title: t('pages.playlistTracks') as string }} />
			<View style={styles.container}>
				<FlashList
					contentContainerStyle={{ paddingBottom: 30 }}
					ListHeaderComponent={renderHeader}
					data={tracks}
					renderItem={({ item, index }) =>
						renderTrack({
							track: item,
							index
						})
					}
					estimatedItemSize={100}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
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
