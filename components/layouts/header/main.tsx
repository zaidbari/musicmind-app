import { IconButton } from '@/components/buttons/iconButton'
import { colors } from '@/constants/colors'
import { useAuth } from '@/context/auth'
import { useLanguage } from '@/hooks/useLanguage'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { InfoButton } from './infoButton'
import { useSearchModal } from '@/hooks/modals/useSearchModal'

export function MainHeader(): JSX.Element {
	const { signOut } = useAuth()
	const { setSearchVisible } = useSearchModal()
	const router = useRouter()
	const { _handleLanguageChange } = useLanguage()

	return (
		<View style={{ backgroundColor: colors.primary, alignItems: 'center', flexDirection: 'row' }}>
			<IconButton
				onPress={() => {
					setSearchVisible(true)
				}}
				icon={'search-outline'}
			/>
			<IconButton onPress={_handleLanguageChange} icon={'language-outline'} />
			<InfoButton />
			<IconButton onPress={() => router.push('/newsfeed')} icon={'newspaper-outline'} />
			<IconButton onPress={() => {}} icon={'cog-outline'} />
			<IconButton onPress={signOut} icon={'ios-power-sharp'} />
		</View>
	)
}
