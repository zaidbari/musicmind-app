import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'

export default function useNetwork(): boolean {
	const [isConnected, setIsConnected] = useState<boolean>(true)

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(state => {
			setIsConnected(state.isConnected ?? false)
		})

		return () => unsubscribe()
	}, [])

	return isConnected
}
