import { useTokens } from '@/hooks/useTokens'
import { Tokens } from '@/types/tokens'
import { logger } from '@/utils/logger'
import { useRouter, useSegments } from 'expo-router'
import { ReactElement, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

//TODO: Add a protected route hook to protect the route access based on user authentication.

// This context will be used to store the user info.
const AuthContext = createContext<{
	auth: Tokens | null
	signIn: (tokens: Tokens) => void
	signOut: () => void
}>({
	auth: null,
	signIn: (tokens: Tokens): void => {},
	signOut: (): void => {}
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

	const { getTokens, removeTokens, setTokens } = useTokens()

	useProtectedRoute(auth)

	const signIn = useCallback(async (tokens: Tokens) => {
		try {
			await setTokens(tokens)
			setAuth(tokens)
		} catch (e) {
			logger.log(e)
		}
	}, [])

	const signOut = useCallback(async () => {
		await removeTokens()
		setAuth(null)
	}, [])

	const loadStorageData = useCallback(async () => {
		const tokens = await getTokens()
		if (tokens) {
			setAuth(tokens)
		}
	}, [])

	useEffect(() => {
		loadStorageData()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				auth
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
