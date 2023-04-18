import Ionicons from '@expo/vector-icons/Ionicons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

const EmptyCard = (): JSX.Element => {
	const { t } = useTranslation()
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Ionicons name="warning-outline" size={100} color="white" />
			<Text style={{ color: 'white', fontSize: 25, marginVertical: 10, textAlign: 'center' }}>{t('noItems')}</Text>
		</View>
	)
}

export default memo(EmptyCard)
