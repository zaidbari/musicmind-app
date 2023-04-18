import { EmptyCard } from '@/components/cards'
import { Loader } from '@/components/loader'
import { colors } from '@/constants/colors'
import { useGetNewsfeed } from '@/hooks/queries'
import { FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const NewsfeedScreen: FC<{}> = (): JSX.Element => {
	const { isLoading, newsfeed } = useGetNewsfeed()

	if (isLoading) return <Loader />
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={newsfeed}
				ListEmptyComponent={<EmptyCard />}
				keyExtractor={item => String(item.id)}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<Text style={styles.cardTitle}>{item.title}</Text>
						<Text style={styles.cardContent}>{item.content}</Text>
					</View>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	card: {
		flex: 1,
		backgroundColor: colors.secondary,
		borderRadius: 10,
		padding: 20,
		marginBottom: 10
	},
	cardContent: {
		flex: 1,
		fontSize: 16,
		color: 'white'
	},
	cardTitle: {
		fontSize: 20,
		color: colors.accent,
		fontWeight: 'bold',
		marginVertical: 10
	}
})

export default NewsfeedScreen
