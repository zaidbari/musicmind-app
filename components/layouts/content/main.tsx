import { useDevice } from '@/context/device'
import { MainStack } from '@/stacks/main'
import { useEffect, useState } from 'react'
import { View, useWindowDimensions } from 'react-native'

export function MainContentArea({ open }: { open: boolean }): JSX.Element {
	const { height } = useWindowDimensions()
	const [show, setShow] = useState<boolean>(true)
	const device = useDevice()

	useEffect(() => {
		if (device === 'phone') {
			if (!open) setShow(true)
			else setShow(false)
		}
	}, [open, device])

	return (
		<View style={{ flex: 2, height, display: show ? 'flex' : 'none' }}>
			<MainStack />
		</View>
	)
}
