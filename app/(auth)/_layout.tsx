import { colors } from '@/constants/colors'
import { Stack } from 'expo-router'
import { FC } from 'react'

export const unstable_settings = { initialRouteName: 'sign-in' }
const AuthLayout: FC<{}> = (): JSX.Element => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: colors.primary
				}
			}}
		>
			<Stack.Screen
				name="sign-in"
				options={{
					title: 'Sign In'
				}}
			/>
		</Stack>
	)
}

export default AuthLayout
