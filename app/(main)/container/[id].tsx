import PlaylistCard from '@/components/cards/playlistCard'
import { Input } from '@/components/inputs/input'
import { Loader } from '@/components/loader'
import { ResetView } from '@/components/reset'
import { colors } from '@/constants/colors'
import { usePlaylists } from '@/hooks/queries/usePlaylists'
import { Stack, useSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

export default function PlaylistScreen() {
	const { t } = useTranslation()
	const { id } = useSearchParams()
	const { isLoading, playlists, setShouldReset } = usePlaylists(id as string)

	if (isLoading) return <Loader />

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: t('pages.playlist') as string }} />
			<ResetView setShouldReset={setShouldReset}>
				<Input placeholder={t('inputs.searchPlaylists') as string} style={styles.input} />
			</ResetView>

			<FlatGrid
				additionalRowStyle={{ padding: 0 }}
				itemDimension={230}
				spacing={20}
				data={playlists}
				renderItem={({ item }) => <PlaylistCard item={item} />}
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
