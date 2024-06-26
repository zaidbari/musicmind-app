import { EmptyCard, InternalContainerCard } from '@/components/cards'
import { Input } from '@/components/inputs/input'
import { Loader } from '@/components/loader'
import { ResetView } from '@/components/reset'
import { colors } from '@/constants/colors'
import { useLayout } from '@/hooks/layout/useLayout'
import { useGetInternalContainers } from '@/hooks/queries'
import { Container } from '@/types/container'
import { Stack } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

const InternalContainerScreen = (): JSX.Element => {
	const { t } = useTranslation()
	const { isLoading, containers, setShouldReset, search } = useGetInternalContainers()

	/**
	 * using this hook to dynamically update the width of cards depending on
	 * number of items per row and the width of the screen
	 */
	const { width, setLayoutWidth, setItemsCount } = useLayout()

	const renderContainer = useCallback(
		({ item }: { item: Container }) => <InternalContainerCard width={width} item={item} />,
		[width]
	)

	if (isLoading) return <Loader />
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: t('pages.internalContainers') as string }} />
			<ResetView setShouldReset={setShouldReset}>
				<Input
					accessibilityHint={t('inputs.searchPreMadePlaylists') as string}
					returnKeyType={'search'}
					inputMode={'search'}
					placeholder={t('inputs.searchPreMadePlaylists') as string}
					style={styles.input}
					onSubmitEditing={({ nativeEvent }) => {
						search(nativeEvent.text)
					}}
				/>
			</ResetView>

			<FlatGrid
				// ListHeaderComponent={<Text style={styles.title}>{t('categories')}</Text>}
				onLayout={({ nativeEvent }) => setLayoutWidth(nativeEvent.layout.width)}
				onItemsPerRowChange={setItemsCount}
				ListEmptyComponent={<EmptyCard />}
				spacing={20}
				additionalRowStyle={{ padding: 0 }}
				itemDimension={180}
				data={containers}
				renderItem={({ item }: { item: Container }) => renderContainer({ item })}
			/>
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

export default InternalContainerScreen
