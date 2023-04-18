import RootLayout from '@/components/layouts/rootLayout'
import { Loader } from '@/components/loader'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { FC, useEffect } from 'react'
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

const Root: FC<{}> = (): JSX.Element => {
	// ?loading icons here before application is rendered
	const [loaded, error] = useFonts({
		...Ionicons.font
	})

	useEffect(() => {
		// ?errors are caught by the ErrorBoundary component
		if (error) throw error
	}, [error])

	if (Platform.OS === 'web' && !loaded) {
		// ?we need to return something before the fonts are loaded
		return <Loader />
	}

	// ?wait for all the assets to be loaded before rendering the app
	return loaded ? <RootLayout /> : <SplashScreen />
}

export default Root
