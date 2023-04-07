import Ionicons from '@expo/vector-icons/Ionicons'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

export function EmptyCard() {
	const { t } = useTranslation()
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Ionicons name="warning-outline" size={100} color="white" />
			<Text style={{ color: 'white', fontSize: 25, marginVertical: 10, textAlign: 'center' }}>{t('noItems')}</Text>
		</View>
	)
}
