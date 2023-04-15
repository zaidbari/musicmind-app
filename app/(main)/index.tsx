import ContainerCard from '@/components/cards/containerCard'
import { EmptyCard } from '@/components/cards/emptyCard'
import { Input } from '@/components/inputs/input'
import { Loader } from '@/components/loader'
import { ResetView } from '@/components/reset'
import { colors } from '@/constants/colors'
import { useGetContainers } from '@/hooks/queries/useGetContainers'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

function HomeScreen(): JSX.Element {
	const { t } = useTranslation()
	const { isLoading, containers, setShouldReset, search } = useGetContainers()
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
			<ResetView setShouldReset={setShouldReset}>
				<Input
					returnKeyType={'search'}
					inputMode={'search'}
					placeholder={t('inputs.searchPreMadePlaylists') as string}
					style={styles.input}
					onSubmitEditing={({ nativeEvent }) => {
						search(nativeEvent.text)
					}}
				/>
			</ResetView>
			<Text style={styles.title}>{t('categories')}</Text>
			<FlatGrid
				onLayout={({ nativeEvent }) => setLayoutWidth(nativeEvent.layout.width)}
				onItemsPerRowChange={setItemsCount}
				ListEmptyComponent={<EmptyCard />}
				spacing={20}
				additionalRowStyle={{ padding: 0 }}
				itemDimension={200}
				data={containers}
				renderItem={({ item }) => <ContainerCard width={width} item={item} />}
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
