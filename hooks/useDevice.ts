import * as Device from 'expo-device'
import { useState, useEffect } from 'react'

export const useDevice = (): string => {
	const [device, setDevice] = useState<string>('tablet')

	useEffect(() => {
		Device.getDeviceTypeAsync().then(deviceType => {
			if (deviceType === Device.DeviceType.PHONE) setDevice('phone')
			else if (deviceType === Device.DeviceType.TABLET) setDevice('tablet')
			else setDevice('desktop')
		})
	}, [])

	return device
}
