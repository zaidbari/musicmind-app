export type User = {
	id: string
	name: string
	email: string
}

export type AuthContextType = {
	signIn: (user: User) => void
	signOut: () => void
	user: User | null
}
