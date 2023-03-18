import { AuthContextType, User } from '@/types/user'
import { useRouter, useSegments } from 'expo-router'
import { createContext, ReactElement, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

// This context will be used to store the user info.
const AuthContext = createContext<AuthContextType>({
	signIn: (user: User): void => {},
	signOut: (): void => {},
	user: null as User | null
})

// This hook can be used to access the user info.
export function useAuth() {
	return useContext(AuthContext)
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: User | null) {
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		const inAuthGroup = segments[0] === '(auth)'

		if (!user && !inAuthGroup) {
			router.replace('/sign-in')
		} else if (user && inAuthGroup) {
			router.replace('/')
		}
	}, [user, segments])
}

export function Provider({ children }: { children: ReactNode | ReactElement }) {
	const [user, setAuth] = useState<User | null>(null)
	useProtectedRoute(user)

	const signIn = useCallback((user: User) => {
		setAuth(user)
	}, [])

	const signOut = useCallback(() => {
		setAuth(null)
	}, [])

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				user
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
