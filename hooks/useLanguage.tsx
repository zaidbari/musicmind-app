import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next'

type TUseLanguageReturnType = {
	_handleLanguageChange: () => Promise<void>
}

export function useLanguage(): TUseLanguageReturnType {
	const { i18n } = useTranslation()

	const _handleLanguageChange = async () => {
		if (i18n.language === 'en') {
			i18n.changeLanguage('da')
			await AsyncStorage.setItem('language', 'da')
		} else {
			i18n.changeLanguage('en')
			await AsyncStorage.setItem('language', 'en')
		}
	}

	return { _handleLanguageChange }
}
