import { ErrorFallback } from '@/components/errorFallback'
import { NoInternet } from '@/components/noInternet'
import Providers from '@/context'
import useNetwork from '@/hooks/useNetwork'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Stack } from 'expo-router'
import { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Layout(): JSX.Element {
	const isConnected = useNetwork()
	const { i18n } = useTranslation()
	useLayoutEffect(() => {
		AsyncStorage.getItem('language')
			.then(language => {
				if (language) i18n.changeLanguage(language)
				else i18n.changeLanguage('da')
			})
			.catch(() => {
				// fallback to default language
				i18n.changeLanguage('da')
			})
	}, [])

	return isConnected ? (
		<SafeAreaView style={StyleSheet.absoluteFill}>
			<ErrorFallback>
				<Providers>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="(auth)" options={{ headerShown: false }} />
						<Stack.Screen name="(main)" options={{ headerShown: false }} />
					</Stack>
				</Providers>
			</ErrorFallback>
		</SafeAreaView>
	) : (
		<NoInternet />
	)
}
