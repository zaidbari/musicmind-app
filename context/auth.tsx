import { useTokens } from '@/hooks/useTokens'
import { Tokens } from '@/types/tokens'
import { useRouter, useSegments } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'

// This context will be used to store the user info.
const AuthContext = React.createContext({
	signIn: (tokens: Tokens): void => {},
	signOut: (): void => {}
})

// This hook can be used to access the user info.
export const useAuth = () => React.useContext(AuthContext)

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

export const AuthProvider = ({ children }: { children: React.ReactNode | React.ReactElement }): JSX.Element => {
	const [auth, setAuth] = useState<Tokens | null>(null)

	const { getTokens, removeTokens, setTokens } = useTokens()

	useProtectedRoute(auth)

	const signIn = useCallback(async (tokens: Tokens) => {
		try {
			await setTokens(tokens)
			setAuth(tokens)
		} catch (e) {
			console.log(e)
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
				signOut
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
