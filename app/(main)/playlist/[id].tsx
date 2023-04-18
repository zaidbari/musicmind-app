import { EmptyCard, PlaylistCard } from '@/components/cards'
import { Input } from '@/components/inputs/input'
import { Loader } from '@/components/loader'
import { ResetView } from '@/components/reset'
import { colors } from '@/constants/colors'
import { useLayout } from '@/hooks/layout/useLayout'
import { useGetPlaylists } from '@/hooks/queries'
import { TPlaylist } from '@/types/playlist'
import { Stack, useSearchParams } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

const PlaylistScreen = (): JSX.Element => {
	const { t } = useTranslation()
	const { isLoading, playlists, setShouldReset, search } = useGetPlaylists()
	/**
	 * using this hook to dynamically update the width of cards depending on
	 * number of items per row and the width of the screen
	 */
	const { width, setLayoutWidth, setItemsCount } = useLayout()

	const renderPlaylist = useCallback(
		({ item }: { item: TPlaylist }) => <PlaylistCard width={width} item={item} />,
		[width]
	)

	if (isLoading) return <Loader />
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: t('pages.playlist') as string }} />
			<ResetView setShouldReset={setShouldReset}>
				<Input
					returnKeyType={'search'}
					inputMode={'search'}
					onSubmitEditing={({ nativeEvent }) => {
						search(nativeEvent.text)
					}}
					placeholder={t('inputs.searchPlaylists') as string}
					style={styles.input}
				/>
			</ResetView>

			<FlatGrid
				onLayout={({ nativeEvent }) => setLayoutWidth(nativeEvent.layout.width)}
				onItemsPerRowChange={setItemsCount}
				ListEmptyComponent={<EmptyCard />}
				additionalRowStyle={{ padding: 0 }}
				itemDimension={200}
				spacing={20}
				data={playlists}
				renderItem={({ item }) => renderPlaylist({ item })}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 0
	},
	input: {
		flexGrow: 1
	},
	title: {
		fontSize: 20,
		color: colors.accent,
		fontWeight: 'bold',
		marginVertical: 10
	}
})

export default PlaylistScreen
