import { View, useWindowDimensions } from 'react-native'

import AlbumImage from './albumImage'
import SeekBar from './seekBar'
import ControlButtons from './controlButtons'
import VolumeBar from './volumeBar'
import { useDevice } from '@/context/device'
import { useEffect, useState } from 'react'

export default function TrackControls({ open }: { open: boolean }): JSX.Element {
	const device = useDevice()
	const { width } = useWindowDimensions()
	const [sideWidth, setSideWidth] = useState<number>(250)

	useEffect(() => {
		if (device === 'phone') setSideWidth(width - 20)
	}, [])

	return (
		<View style={{ justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center' }}>
			{device !== 'phone' ? <AlbumImage /> : null}
			<ControlButtons width={sideWidth} open={open} />
			{device !== 'phone' ? <SeekBar width={sideWidth} /> : open ? <SeekBar width={sideWidth} /> : null}
			{device !== 'phone' ? <VolumeBar width={sideWidth} /> : open ? <VolumeBar width={sideWidth} /> : null}
		</View>
	)
}
