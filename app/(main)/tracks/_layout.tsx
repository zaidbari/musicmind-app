import { colors } from '@/constants/colors'
import { Stack } from 'expo-router'

import { useTranslation } from 'react-i18next'

const TrackLayout = (): JSX.Element => {
	const { t } = useTranslation()

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				title: t('pages.playlistTracks') as string,
				contentStyle: {
					backgroundColor: colors.primary
				}
			}}
		/>
	)
}

export default TrackLayout
