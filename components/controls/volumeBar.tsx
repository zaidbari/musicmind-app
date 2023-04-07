import { colors } from '@/constants/colors'
import { useSound } from '@/context/sound'
import Ionicons from '@expo/vector-icons/Ionicons'
import Slider from '@react-native-community/slider'
import { memo, useEffect, useState } from 'react'
import { View } from 'react-native'

function VolumeBar() {
	const { currentPlayingTrack, _setVolume, volume } = useSound()

	const [disabled, setDisabled] = useState<boolean>(true)

	useEffect(() => {
		if (currentPlayingTrack.current === null) setDisabled(true)
		else setDisabled(false)
	}, [currentPlayingTrack.current])

	return (
		<View
			style={{
				justifyContent: 'space-between',
				alignItems: 'center',
				width: 250,
				gap: 10,
				flexDirection: 'row',
				marginTop: 20
			}}
		>
			<Ionicons name="volume-low" size={24} color={disabled ? colors.secondary : 'white'} />
			<Slider
				style={{ width: 190, height: 10 }}
				minimumValue={0}
				maximumValue={1}
				value={volume.current}
				disabled={disabled}
				onSlidingComplete={_setVolume}
				tapToSeek={true}
				thumbTintColor={disabled ? colors.secondary : colors.accent}
				minimumTrackTintColor={disabled ? colors.secondary : colors.accent}
				maximumTrackTintColor={colors.secondary}
			/>
			<Ionicons name="volume-high" size={24} color={disabled ? colors.secondary : 'white'} />
		</View>
	)
}

export default memo(VolumeBar)
