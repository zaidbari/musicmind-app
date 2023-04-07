import { Tokens } from '@/types/tokens'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useTokens = () => {
	const getTokens = async () => {
		const access = await AsyncStorage.getItem('@access')
		const refresh = await AsyncStorage.getItem('@refresh')

		if (!access || !refresh) return null
		return {
			access,
			refresh
		}
	}
	const setTokens = async ({ access, refresh }: Tokens): Promise<void> => {
		await AsyncStorage.setItem('@access', access)
		await AsyncStorage.setItem('@refresh', refresh)
	}
	const removeTokens = async (): Promise<void> => {
		await AsyncStorage.removeItem('@access')
		await AsyncStorage.removeItem('@refresh')
	}

	return { getTokens, setTokens, removeTokens }
}
