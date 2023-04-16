import { colors } from '@/constants/colors'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default (): JSX.Element => {
	const { t } = useTranslation()
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				title: t('pages.newsfeed') as string,
				contentStyle: {
					backgroundColor: colors.primary
				}
			}}
		/>
	)
}
