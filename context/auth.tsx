import { USERTYPE_URL } from '@/constants/urls'
import { useTokens } from '@/hooks/useTokens'
import { Tokens } from '@/types/tokens'
import { logger } from '@/utils/logger'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useRouter, useSegments } from 'expo-router'
import { ReactElement, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

//TODO: Add a protected route hook to protect the route access based on user authentication.

// This context will be used to store the user info.
const AuthContext = createContext<{
	auth: Tokens | null
	signIn: (tokens: Tokens) => void
	signOut: () => void
	isAdmin: boolean
}>({
	auth: null,
	signIn: (tokens: Tokens): void => {},
	signOut: (): void => {},
	isAdmin: false
})

// This hook can be used to access the user info.
export const useAuth = () => useContext(AuthContext)

// This hook will protect the route access based on user authentication.
const useProtectedRoute = (tokens: Tokens | null): void => {
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		const inAuthGroup = segments[0] === '(auth)'
		if (!tokens?.access && !inAuthGroup) {
			router.replace('/sign-in')
		} else if (tokens?.access && inAuthGroup) {
			router.replace('/')
		}
	}, [tokens?.access, segments])
}

export const AuthProvider = ({ children }: { children: ReactNode | ReactElement }): JSX.Element => {
	const [auth, setAuth] = useState<Tokens | null>(null)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)

	const { getTokens, removeTokens, setTokens } = useTokens()
	const segments = useSegments()
	const router = useRouter()

	// useProtectedRoute(auth)

	const getUsertype = useCallback(
		async (access: string) => {
			const { data } = await axios.get(USERTYPE_URL, {
				headers: { Authorization: `JWT ${access}` }
			})
			await AsyncStorage.setItem('@usertype', data.usertype.toString())
			if (data.usertype == 4 || data.usertype == 5) {
				setIsAdmin(true)
			}
		},
		[auth]
	)

	const signIn = useCallback(async (tokens: Tokens) => {
		try {
			await setTokens(tokens)
			await getUsertype(tokens.access)
			setAuth(tokens)
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: 'Auth Context'
				}
			})
		}
	}, [])

	const signOut = useCallback(async () => {
		await removeTokens()
		await AsyncStorage.removeItem('@usertype')
		setAuth(null)
	}, [])

	const loadStorageData = useCallback(async () => {
		const tokens = await getTokens()
		if (tokens) {
			setAuth(tokens)
			const usertype = await AsyncStorage.getItem('@usertype')
			if (usertype == null) {
				await getUsertype(tokens.access)
			} else if (usertype == '4' || usertype == '5') {
				setIsAdmin(true)
			}
		}
	}, [])

	useEffect(() => {
		loadStorageData()
	}, [])

	useEffect(() => {
		const inAuthGroup = segments[0] === '(auth)'
		if (!auth?.access && !inAuthGroup) {
			router.replace('/sign-in')
		} else if (auth?.access && inAuthGroup) {
			router.replace('/')
		}
	}, [auth?.access, segments])

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				auth,
				isAdmin
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
