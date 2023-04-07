import { IconButton } from '@/components/buttons/iconButton'
import { colors } from '@/constants/colors'
import { useAuth } from '@/context/auth'
import { useLanguage } from '@/hooks/useLanguage'
import { useSearch } from '@/hooks/useSearch'
import { View } from 'react-native'

export function MainHeader(): JSX.Element {
	const { signOut } = useAuth()
	const { setSearchVisible } = useSearch()
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
			<IconButton onPress={() => {}} icon={'notifications-outline'} />
			<IconButton onPress={() => {}} icon={'newspaper-outline'} />
			<IconButton onPress={() => {}} icon={'cog-outline'} />
			<IconButton onPress={signOut} icon={'ios-power-sharp'} />
		</View>
	)
}
