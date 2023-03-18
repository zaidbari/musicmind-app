import { Provider as AuthProvider } from '@/context/auth'
import AntDesign from '@expo/vector-icons/AntDesign'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = { initialRouteName: '(tabs)' }

const Layout = (): JSX.Element => {
	const colorScheme = useColorScheme()

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<AuthProvider>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				</Stack>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default function Root(): JSX.Element {
	const [loaded, error] = useFonts({
		...AntDesign.font
	})

	useEffect(() => {
		if (error) throw error
	}, [error])

	return loaded ? <Layout /> : <SplashScreen />
}
