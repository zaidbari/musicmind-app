import Constants from 'expo-constants'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { LinkComponent } from '../components/linkComponent'

type MainLinksProps = {
	open: boolean
	deviceType: string
}

export function MainLinks({ open, deviceType }: MainLinksProps): JSX.Element {
	const { t } = useTranslation()
	return (
		<View>
			<LinkComponent open={open} deviceType={deviceType} href="/home" icon="home" title={t('pages.home')} />
			<LinkComponent
				open={open}
				deviceType={deviceType}
				href="/internal-containers"
				icon="musical-notes"
				title={t('pages.internalContainers')}
			/>
			<LinkComponent
				open={open}
				deviceType={deviceType}
				href="/my-playlists"
				icon="folder-open-sharp"
				title={t('pages.myPlaylists')}
			/>
			<LinkComponent
				open={open}
				deviceType={deviceType}
				href="/create-playlist"
				icon="duplicate-sharp"
				title={t('pages.createPlaylist')}
			/>
			{open && <Text style={{ fontSize: 10, color: 'white' }}>V {Constants?.expoConfig?.version}</Text>}
		</View>
	)
}
