import { colors } from '@/constants/colors'
import { Stack } from 'expo-router'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const PlaylistLayout: FC<{}> = (): JSX.Element => {
	const { t } = useTranslation()
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				title: t('pages.playlist') as string,
				contentStyle: {
					backgroundColor: colors.primary
				}
			}}
		/>
	)
}

export default PlaylistLayout
