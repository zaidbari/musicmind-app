import { StyleSheet } from 'react-native'

import { Text, View } from '@/components/Themed'

const SearchScreen = (): JSX.Element => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Search</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	}
})

export default SearchScreen
