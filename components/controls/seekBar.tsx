import { colors } from '@/constants/colors'
import { useSound } from '@/context/sound'
import Slider from '@react-native-community/slider'
import { memo, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

function SeekBar() {
	const { currentPlayingTrack, playbackStatus, _setPosition } = useSound()

	const [disabled, setDisabled] = useState<boolean>(true)
	const [value, setValue] = useState<number>(0)
	const [maxValue, setMaxValue] = useState<number>(1)

	// convert miliseconds to human readable time
	const _convertToTime = (millis: number) => {
		let minutes = Math.floor(millis / 60000)
		let seconds = parseFloat(((millis % 60000) / 1000).toFixed(0))
		if (isNaN(minutes)) minutes = 0
		if (isNaN(seconds)) seconds = 0
		return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	}

	useEffect(() => {
		if (playbackStatus.isLoaded) {
			setValue(isNaN(playbackStatus.positionMillis) ? 0 : playbackStatus.positionMillis)
			setMaxValue(isNaN(playbackStatus.durationMillis) ? 1 : playbackStatus.durationMillis)
		}
	}, [playbackStatus])

	useEffect(() => {
		if (currentPlayingTrack.current === null) setDisabled(true)
		else setDisabled(false)
	}, [currentPlayingTrack.current])

	return (
		<View style={{ justifyContent: 'space-between', alignItems: 'center', width: 250, gap: 10, flexDirection: 'row' }}>
			{currentPlayingTrack.current ? (
				<Text style={{ color: 'white', fontSize: 10 }}>{_convertToTime(value)}</Text>
			) : (
				<Text style={{ color: colors.secondary, fontSize: 10 }}>00:00</Text>
			)}
			<Slider
				style={{ width: 190, height: 10 }}
				minimumValue={0}
				maximumValue={maxValue}
				value={value}
				disabled={disabled}
				onSlidingComplete={_setPosition}
				tapToSeek={true}
				thumbTintColor={disabled ? colors.secondary : colors.accent}
				minimumTrackTintColor={colors.accent}
				maximumTrackTintColor={colors.secondary}
			/>
			{currentPlayingTrack.current ? (
				<Text style={{ color: 'white', fontSize: 10 }}>{_convertToTime(maxValue)}</Text>
			) : (
				<Text style={{ color: colors.secondary, fontSize: 10 }}>00:00</Text>
			)}
		</View>
	)
}

export default memo(SeekBar)
