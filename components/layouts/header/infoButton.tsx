import { IconButton } from '@/components/buttons/iconButton'
import { colors } from '@/constants/colors'
import { ACTION_MENU_STYLES } from '@/constants/misc'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { openBrowserAsync } from 'expo-web-browser'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'

export const InfoButton = (): JSX.Element => {
	const { showActionSheetWithOptions } = useActionSheet()
	const { t } = useTranslation()
	const onPress = () => {
		const options = ['Burgermanual', 'Feedback', t('menu.tour'), t('close')]
		const cancelButtonIndex = options.length - 1
		const menu = {
			options,
			title: t('actions') as string,
			cancelButtonIndex
		}
		const menu_options = { ...menu, ...ACTION_MENU_STYLES }

		showActionSheetWithOptions(menu_options, (selectedIndex?: number) => {
			switch (selectedIndex) {
				case 0:
					if (Platform.OS !== 'web') {
						openBrowserAsync('https://instoremusic.dk/Musicmind_UserManual_NativeApp.pdf')
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
		})
	}
	return <IconButton onPress={onPress} icon={'information-circle-outline'} />
}
