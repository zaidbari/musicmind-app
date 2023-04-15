import { createContext, useContext, useEffect, useState } from 'react'
import * as Device from 'expo-device'

const DeviceContext = createContext<string>('')
export const useDevice = () => useContext(DeviceContext)

export const DeviceProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const [device, setDevice] = useState<string>('tablet')

	useEffect(() => {
		Device.getDeviceTypeAsync().then(deviceType => {
			if (deviceType === Device.DeviceType.PHONE) setDevice('phone')
			else if (deviceType === Device.DeviceType.TABLET) setDevice('tablet')
			else setDevice('desktop')
		})
	}, [])

	return <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
}
