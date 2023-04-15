import { EmptyCard } from '@/components/cards/emptyCard'
import PlaylistCard from '@/components/cards/playlistCard'
import { Input } from '@/components/inputs/input'
import { Loader } from '@/components/loader'
import { ResetView } from '@/components/reset'
import { colors } from '@/constants/colors'
import { useGetPlaylists } from '@/hooks/queries/useGetPlaylists'
import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

export default function PlaylistScreen() {
	const { t } = useTranslation()
	const { id } = useSearchParams()
	const { isLoading, playlists, setShouldReset, search } = useGetPlaylists(id as string)
	const [width, setWidth] = useState<number>(0)
	const [itemsCount, setItemsCount] = useState<number>(0)
	const [layoutWidth, setLayoutWidth] = useState<number>(0)

	useEffect(() => {
		if (layoutWidth !== 0) {
			setWidth((layoutWidth - 20 * itemsCount - 1) / itemsCount)
		}
	}, [layoutWidth, itemsCount])

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
				itemDimension={230}
				spacing={20}
				data={playlists}
				renderItem={({ item }) => <PlaylistCard width={width} item={item} />}
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
	},
	grid: {
		padding: 0,
		marginTop: 10
	}
})
