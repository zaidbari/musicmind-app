import { colors } from '@/constants/colors'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

const InternalPlaylistLayout = (): JSX.Element => {
	const { t } = useTranslation()
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				title: t('pages.internalPlaylist') as string,
				contentStyle: {
					backgroundColor: colors.primary
				}
			}}
		/>
	)
}

export default InternalPlaylistLayout
