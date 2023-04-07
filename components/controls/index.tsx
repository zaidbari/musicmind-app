import { View } from 'react-native'

import AlbumImage from './album'
import ControlButtons from './buttons'
import { useDevice } from '@/hooks/useDevice'

export default function TrackControls({ open }: { open: boolean }): JSX.Element {
	const device = useDevice()

	return (
		<View style={{ justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center', flexGrow: 2 }}>
			{device !== 'phone' ? <AlbumImage /> : null}
			<ControlButtons open={open} />
		</View>
	)
}
