import { colors } from '@/constants/colors'
import { Stack } from 'expo-router'

export const unstable_settings = { initialRouteName: 'sign-in' }
const AuthLayout = (): JSX.Element => {
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
