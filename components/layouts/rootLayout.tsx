import { ErrorFallback } from '@/components/errorFallback'
import { NoInternet } from '@/components/noInternet'
import Providers from '@/context'
import { useNetwork } from '@/hooks/useNetwork'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Stack } from 'expo-router'
import { useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LogBox, Platform, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { lockAsync, OrientationLock } from 'expo-screen-orientation'
import { useDevice } from '@/context/device'

export default function RootLayout(): JSX.Element {
	const isConnected = useNetwork()
	const { i18n } = useTranslation()
	const device = useDevice()

	useEffect(() => {
		LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
	}, [])

	useLayoutEffect(() => {
		if (device === 'phone') lockAsync(OrientationLock.PORTRAIT_UP)
		else {
			if (Platform.OS === 'android') lockAsync(OrientationLock.ALL)
			if (Platform.OS === 'ios') lockAsync(OrientationLock.DEFAULT)
		}

		AsyncStorage.getItem('language')
			.then(language => {
				if (language) i18n.changeLanguage(language)
				else i18n.changeLanguage('da')
			})
			.catch(() => {
				// fallback to default language
				i18n.changeLanguage('da')
			})

		// eslint-disable-next-line react-hooks/exhaustive-deps
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
