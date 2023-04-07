import { IconButton } from '@/components/buttons/iconButton'
import { colors } from '@/constants/colors'
import { useActionSheet } from '@expo/react-native-action-sheet'
import * as WebBrowser from 'expo-web-browser'
import { Platform } from 'react-native'

export function InfoButton() {
	const { showActionSheetWithOptions } = useActionSheet()

	const onPress = () => {
		const options = ['Burgermanual', 'Feedback', 'Guided Tour', 'Cancel']
		const cancelButtonIndex = options.length - 1

		showActionSheetWithOptions(
			{
				options,
				title: 'Information',
				userInterfaceStyle: 'dark',
				showSeparators: true,
				containerStyle: {
					backgroundColor: colors.primary
				},
				separatorStyle: {
					backgroundColor: colors.secondary
				},
				titleTextStyle: {
					color: colors.accent,
					fontWeight: 'bold',
					fontSize: 20
				},
				textStyle: {
					color: 'white',
					fontSize: 16
				},
				useModal: true,
				cancelButtonIndex
			},
			(selectedIndex?: number) => {
				switch (selectedIndex) {
					case 0:
						if (Platform.OS !== 'web') {
							WebBrowser.openBrowserAsync('https://instoremusic.dk/Musicmind_UserManual_NativeApp.pdf')
						} else {
							window.open('https://instoremusic.dk/Musicmind_UserManual_NativeApp.pdf', '_blank', 'noopener,noreferrer')
						}
						break
					case 1:
						console.log('Feedback')
						break
					case 2:
						console.log('Guided Tour')
						break
					case cancelButtonIndex:
					// Canceled
				}
			}
		)
	}
	return <IconButton onPress={onPress} icon={'information-circle-outline'} />
}
