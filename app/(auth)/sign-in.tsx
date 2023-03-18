import { Text, View } from '@/components/Themed'
import { useAuth } from '@/context/auth'

const SignIn = (): JSX.Element => {
	const { signIn } = useAuth()

	const handleSignIn = () => {
		signIn({
			id: '1',
			name: 'John Doe',
			email: 'zaid@email.com'
		})
	}

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text onPress={handleSignIn}>Sign In</Text>
		</View>
	)
}

export default SignIn
