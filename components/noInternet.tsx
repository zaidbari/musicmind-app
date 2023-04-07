import { colors } from '@/constants/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function NoInternet(): JSX.Element {
	return (
		<SafeAreaView style={StyleSheet.absoluteFill}>
			<View style={styles.container}>
				<Ionicons name="ios-pulse" size={100} color={colors.accent} />
				<Text style={styles.title}>No Internet</Text>
			</View>
		</SafeAreaView>
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
		marginTop: 10,
		fontWeight: 'bold',
		textAlign: 'center'
	}
})
