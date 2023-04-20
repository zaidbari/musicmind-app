import { UserPlaylistCard } from '@/components/cards'
import AssignedPlaylistCard from '@/components/cards/assignedPlaylistCard'
import EmptyCard from '@/components/cards/emptyCard'
import { Loader } from '@/components/loader'
import { colors } from '@/constants/colors'
import { ACTION_MENU_STYLES } from '@/constants/misc'
import { useLayout } from '@/hooks/layout/useLayout'
import { useGetMyPlaylistsData } from '@/hooks/queries/useGetMyPlaylistsData'
import { TCopiedPlaylists, TUserPlaylist } from '@/types/playlist'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Stack } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { FlatGrid } from 'react-native-super-grid'

const MyPlaylistsScreen = (): JSX.Element => {
	const { t } = useTranslation()
	const { showActionSheetWithOptions } = useActionSheet()
	const { isLoading, copiedPlaylists, userPlaylists, deleteUserPlaylist } = useGetMyPlaylistsData()
	const menu_options = {
		...{
			options: [t('delete'), t('cancel')],
			title: t('menu.confirmPlaylistDelete') as string,
			cancelButtonIndex: 1,
			destructiveButtonIndex: 0
		},
		...ACTION_MENU_STYLES
	}

	/**
	 * using this hook to dynamically update the width of cards depending on
	 * number of items per row and the width of the screen
	 */
	const { width, setLayoutWidth, setItemsCount } = useLayout()
	const onDeletePress = (id: number, type: 'assigned' | 'user') => {
		showActionSheetWithOptions(menu_options, (selectedIndex?: number) => {
			switch (selectedIndex) {
				case 0:
					deleteUserPlaylist(id, type)
					break
				case 1:
				// Canceled
			}
		})
	}

	const renderSeparater = useCallback(() => <View style={styles.separater} />, [])
	const renderUserPlaylist = useCallback(
		({ item }: { item: TUserPlaylist }) => <UserPlaylistCard deleteUserPlaylist={onDeletePress} item={item} />,

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)
	const renderAssignedPlaylist = useCallback(
		({ item }: { item: TCopiedPlaylists }) => (
			<AssignedPlaylistCard deleteUserPlaylist={onDeletePress} width={width} item={item} />
		),

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[width]
	)

	if (isLoading) return <Loader />
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: t('pages.myPlaylists') as string }} />
			<ScrollView style={StyleSheet.absoluteFill}>
				<View>
					<FlatGrid
						ListEmptyComponent={<EmptyCard />}
						ListHeaderComponent={<Text style={styles.title}>{t('pages.assignedPlaylists')}</Text>}
						onItemsPerRowChange={setItemsCount}
						data={copiedPlaylists}
						onLayout={({ nativeEvent }) => setLayoutWidth(nativeEvent.layout.width)}
						renderItem={({ item }) => renderAssignedPlaylist({ item })}
						additionalRowStyle={{ padding: 0 }}
						itemDimension={180}
						spacing={20}
					/>
				</View>
				<View>
					<FlatList
						ListEmptyComponent={<EmptyCard />}
						ListHeaderComponent={<Text style={styles.title}>{t('pages.myPlaylists')}</Text>}
						contentContainerStyle={{ marginBottom: 20 }}
						data={userPlaylists}
						ItemSeparatorComponent={() => renderSeparater()}
						renderItem={({ item }) => renderUserPlaylist({ item })}
					/>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	title: {
		fontSize: 20,
		color: colors.accent,
		fontWeight: 'bold',
		marginBottom: 20
	},
	input: {
		flexGrow: 1
	},
	separater: {
		height: 1,
		backgroundColor: colors.secondary,
		marginVertical: 10
	}
})

export default MyPlaylistsScreen
