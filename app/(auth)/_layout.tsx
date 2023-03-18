import { Stack } from 'expo-router'

const AuthLayout = (): JSX.Element => {
	return (
		<Stack
			screenOptions={{
				headerShown: false
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
