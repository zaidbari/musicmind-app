import { colors } from '@/constants/colors'
import { useDevice } from '@/context/device'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'

type ResetViewProps = {
	setShouldReset: Dispatch<SetStateAction<boolean>>
	children: React.ReactNode | React.ReactElement
}
export function ResetView({ setShouldReset, children }: ResetViewProps): JSX.Element {
	const device = useDevice()
	const { t } = useTranslation()

	return (
		<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
			<Pressable
				onPress={() => setShouldReset(true)}
				style={{
					backgroundColor: colors.secondary,
					paddingHorizontal: 12,
					paddingVertical: 9,
					borderRadius: 5,
					flexGrow: 0,
					alignItems: 'center',
					flexDirection: 'row',
					borderWidth: 1,
					borderColor: colors.secondary
				}}
			>
				{({ pressed }) => (
					<>
						<Ionicons
							name="reload-outline"
							size={20}
							color={pressed ? colors.accent : 'white'}
							style={{ padding: 0 }}
						/>
						{device !== 'phone' && (
							<Text
								style={{
									color: pressed ? colors.accent : 'white',
									marginLeft: 5,
									fontSize: 16
								}}
							>
								{t('reset')}
							</Text>
						)}
					</>
				)}
			</Pressable>
			{children}
		</View>
	)
}
