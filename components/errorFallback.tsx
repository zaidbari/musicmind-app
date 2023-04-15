import ErrorBoundary from 'react-native-error-boundary'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { colors } from '@/constants/colors'
import { logger } from '@/utils/logger'

export function ErrorFallback({ children }: { children: React.ReactElement }): JSX.Element {
	const CustomFallback = (props: { error: Error; resetError: Function }) => (
		<View style={styles.container}>
			<Text style={styles.title}>Something happened!</Text>
			<Text style={styles.text}>{props.error.toString()}</Text>
			<Pressable onPress={e => props.resetError(e)} style={styles.button}>
				<Text style={styles.buttonText}>Try again</Text>
			</Pressable>
		</View>
	)

	function handleError(error: Error, componentStack: string) {
		logger.log(error, componentStack)
	}

	return (
		<ErrorBoundary FallbackComponent={CustomFallback} onError={handleError}>
			{children}
		</ErrorBoundary>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: colors.primary,
		padding: 8,
		textAlign: 'center'
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.accent
	},
	text: {
		marginVertical: 16,
		color: 'white'
	},
	button: {
		width: 300,
		paddingVertical: 8,
		backgroundColor: colors.accent,
		borderRadius: 5,
		marginVertical: 8,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	buttonText: {
		color: colors.primary,
		fontSize: 18,
		marginHorizontal: 8,
		textAlign: 'center',
		fontWeight: 'bold'
	}
})
