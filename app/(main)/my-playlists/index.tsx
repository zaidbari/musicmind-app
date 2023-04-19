import { Loader } from '@/components/loader'
import { colors } from '@/constants/colors'
import { useLayout } from '@/hooks/layout/useLayout'
import { useGetUserPlaylists } from '@/hooks/queries/useGetUserPlaylists'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

const HomeScreen = (): JSX.Element => {
	const { t } = useTranslation()
	const { isLoading, userPlaylists, setShouldReset } = useGetUserPlaylists()

	/**
	 * using this hook to dynamically update the width of cards depending on
	 * number of items per row and the width of the screen
	 */
	const { width, setLayoutWidth, setItemsCount } = useLayout()

	if (isLoading) return <Loader />
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: t('pages.myPlaylists') as string }} />
			<Text>My Playlist</Text>
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
	}
})

export default HomeScreen
