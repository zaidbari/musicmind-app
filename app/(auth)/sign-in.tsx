import { Input } from '@/components/inputs/input'
import { colors } from '@/constants/colors'
import { LOGIN_URL } from '@/constants/urls'
import { useAuth } from '@/context/auth'
import axios, { AxiosError } from 'axios'
import { Image } from 'expo-image'
import { useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'

const SignIn = (): JSX.Element => {
	const { t } = useTranslation()

	const { signIn } = useAuth()
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const handleSignIn = async () => {
		setLoading(true)
		setError(null)

		if (!username || !password) {
			setError(t('auth_empty_fields'))
			return
		}
		try {
			const { data } = await axios.post(LOGIN_URL, { username, password })
			signIn(data)
		} catch (err: AxiosError | any) {
			setError(err.response.data.detail)
		} finally {
			setLoading(false)
		}
	}

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<Image
				source={{ uri: '/assets/images/music_mind_logo.png' }}
				onError={console.error}
				style={styles.image}
				contentFit="contain"
			/>
			<Input
				onChangeText={(text: string) => setUsername(text)}
				autoComplete="username"
				placeholder={t('inputs.username') as string}
				value={username}
				style={{ width: 300 }}
			/>
			<Input
				onChangeText={(text: string) => setPassword(text)}
				autoComplete="off"
				placeholder={t('inputs.password') as string}
				value={password}
				style={{ width: 300 }}
				secureTextEntry
			/>

			<Pressable onPress={handleSignIn} style={styles.button}>
				{loading && <ActivityIndicator color={colors.primary} />}
				<Text style={styles.text}>{t('signin')}</Text>
			</Pressable>

			{error && (
				<View style={{ width: 300 }}>
					<Text style={{ color: 'red', textAlign: 'center' }}>{t(error)}</Text>
				</View>
			)}
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: 300,
		height: 180
	},
	button: {
		width: 300,
		paddingVertical: 8,
		backgroundColor: colors.accent,
		borderRadius: 5,
		marginVertical: 8,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	text: {
		color: colors.primary,
		fontSize: 18,
		marginHorizontal: 8,
		textAlign: 'center',
		fontWeight: 'bold'
	}
})

export default SignIn
