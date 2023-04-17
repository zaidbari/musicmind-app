import { MainHeader } from '@/components/layouts/header/main'
import { colors } from '@/constants/colors'
import { useDevice } from '@/context/device'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text } from 'react-native'

const Title = ({ children }: { children: string }): JSX.Element => <Text style={styles.headerTitle}>{children}</Text>

export function MainStack(): JSX.Element {
	const device = useDevice()
	const { t } = useTranslation()

	return (
		<Stack
			screenOptions={{
				headerTitle: ({ children }) => device !== 'phone' && <Title>{children}</Title>, // eslint-disable-line react/no-unstable-nested-components
				headerRight: () => <MainHeader />, // eslint-disable-line react/no-unstable-nested-components
				headerStyle: styles.headerStyle,
				headerBackTitleVisible: false,
				headerShadowVisible: false,
				headerTintColor: 'white',
				contentStyle: styles.contentStyle
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: t('pages.home') as string,
					headerLeft: () => <></>, // eslint-disable-line react/no-unstable-nested-components
					gestureEnabled: false
				}}
			/>
			<Stack.Screen
				name="playlist"
				options={{
					title: t('pages.playlist') as string
				}}
			/>
			<Stack.Screen
				name="newsfeed"
				options={{
					title: t('pages.newsfeed') as string
				}}
			/>
			<Stack.Screen
				name="tracks"
				options={{
					title: t('pages.playlistTracks') as string
				}}
			/>
		</Stack>
	)
}

const styles = StyleSheet.create({
	contentStyle: {
		backgroundColor: colors.primary,
		paddingHorizontal: 12
	},
	headerStyle: {
		backgroundColor: colors.primary
	},
	headerTitle: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold'
	}
})
