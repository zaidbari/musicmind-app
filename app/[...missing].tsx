import { colors } from '@/constants/colors'
import { ROOT_SCREEN } from '@/constants/urls'
import { Link, Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

const NotFoundScreen = (): JSX.Element => {
	const { t } = useTranslation()
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
			<View style={styles.container}>
				<Text style={styles.title}>This screen doesn't exist.</Text>
				<Link href={`/${ROOT_SCREEN}`} style={styles.link}>
					<Text style={styles.linkText}>{t('menu.backToHome')}</Text>
				</Link>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white'
	},
	link: {
		marginTop: 15,
		paddingVertical: 15
	},
	linkText: {
		fontSize: 14,
		color: colors.accent
	}
})

export default NotFoundScreen
