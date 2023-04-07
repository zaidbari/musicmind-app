import { View } from 'react-native'

import AlbumImage from './albumImage'
import SeekBar from './seekBar'
import ControlButtons from './controlButtons'
import { useDevice } from '@/hooks/useDevice'
import VolumeBar from './volumeBar'

export default function TrackControls({ open }: { open: boolean }): JSX.Element {
	const device = useDevice()

	return (
		<View style={{ justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center' }}>
			{device !== 'phone' ? <AlbumImage /> : null}
			<ControlButtons open={open} />
			{device !== 'phone' ? <SeekBar /> : open ? <SeekBar /> : null}
			{device !== 'phone' ? <VolumeBar /> : open ? <VolumeBar /> : null}
		</View>
	)
}
