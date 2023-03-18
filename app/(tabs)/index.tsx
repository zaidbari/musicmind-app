import { StyleSheet } from 'react-native'

import { Text, View } from '@/components/Themed'

const HomeScreen = (): JSX.Element => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab One</Text>
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

export default HomeScreen
