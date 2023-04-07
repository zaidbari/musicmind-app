import Layout from '@/components/layouts'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import { Platform, UIManager } from 'react-native'

/**
 * ? this is required for the layout animations to work on android devices
 * ? enable layout animations on android devices(https://reactnative.dev/docs/layoutanimation)
 * ? required for the transition between screens and gesture handling
 */
if (Platform.OS === 'android') {
	if (UIManager.setLayoutAnimationEnabledExperimental) UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const unstable_settings = { initialRouteName: '(main)' } // ? set initial route to be our main stack
export { ErrorBoundary } from 'expo-router'

export default (): JSX.Element => {
	// ?loading icons here before application is rendered
	const [loaded, error] = useFonts({
		...Ionicons.font
	})

	useEffect(() => {
		// ?errors are caught by the ErrorBoundary component
		if (error) throw error
	}, [error])

	// ?wait for all the assets to be loaded before rendering the app
	return loaded ? <Layout /> : <SplashScreen />
}
