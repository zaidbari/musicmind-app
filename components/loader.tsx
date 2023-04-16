import { colors } from '@/constants/colors'
import { ActivityIndicator, View } from 'react-native'

export function Loader(): JSX.Element {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: colors.primary
			}}
		>
			<View>
				<ActivityIndicator size={'large'} color={colors.accent} />
			</View>
		</View>
	)
}
