import ContainerCard from '@/components/cards/containerCard'
import { Input } from '@/components/inputs/input'
import { Loader } from '@/components/loader'
import { ResetView } from '@/components/reset'
import { colors } from '@/constants/colors'
import { useContainers } from '@/hooks/queries/useContainers'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

function HomeScreen(): JSX.Element {
	const { t } = useTranslation()
	const { isLoading, containers, setShouldReset } = useContainers()

	if (isLoading) return <Loader />
	return (
		<View style={styles.container}>
			<ResetView setShouldReset={setShouldReset}>
				<Input placeholder={t('inputs.searchPreMadePlaylists') as string} style={styles.input} />
			</ResetView>
			<Text style={styles.title}>{t('categories')}</Text>
			<FlatGrid
				spacing={20}
				additionalRowStyle={{ padding: 0 }}
				itemDimension={230}
				data={containers}
				renderItem={({ item }) => <ContainerCard item={item} />}
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
		marginVertical: 10
	},
	input: {
		flexGrow: 1
	}
})

export default HomeScreen
