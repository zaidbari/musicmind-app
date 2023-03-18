import { Button, StyleSheet } from 'react-native'

import { Text, View } from '@/components/Themed'
import { useAuth } from '@/context/auth'

const SettingsScreen = (): JSX.Element => {
	const { signOut } = useAuth()

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings</Text>
			<Button onPress={signOut} title="Logout" />
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

export default SettingsScreen
