import { colors } from '@/constants/colors'
import { useSound } from '@/context/sound'
import { useDevice } from '@/hooks/useDevice'
import { useTrackControls } from '@/hooks/useTrackControls'
import Ionicons from '@expo/vector-icons/Ionicons'
import { memo, useEffect, useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { View } from 'react-native'

function ControlButtons({ open }: { open: boolean }) {
	const deviceType = useDevice()
	const { _play, _pause, _previous, _next, _toggleLoop, _shuffle, currentPlayingTrack } = useSound()
	const { width } = useWindowDimensions()
	const [sideWidth, setSideWidth] = useState(250)
	const [disabled, setDisabled] = useState(false)

	const { isPaused, isBuffering } = useTrackControls()

	useEffect(() => {
		if (deviceType === 'phone') setSideWidth(width)
	}, [])

	useEffect(() => {
		if (isBuffering) setDisabled(true)
		else setDisabled(false)

		if (currentPlayingTrack.current === null) setDisabled(true)
		else setDisabled(false)
	}, [currentPlayingTrack.current])

	function _handlePress(action: string) {
		if (disabled) return
		if (action === 'play') _play()
		if (action === 'pause') _pause()
		if (action === 'previous') _previous()
		if (action === 'next') _next()
		if (action === 'shuffle') _shuffle()
		if (action === 'loop') _toggleLoop()
	}

	return (
		<View
			style={StyleSheet.flatten([
				{
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: open ? 'row' : 'column'
				},
				open && { width: sideWidth, marginVertical: 20 }
			])}
		>
			{open && (
				<Ionicons
					name="shuffle-sharp"
					size={35}
					color={disabled ? colors.secondary : '#ffffff'}
					style={{ padding: 0 }}
					onPress={() => _handlePress('shuffle')}
				/>
			)}

			<Ionicons
				name="play-skip-back-sharp"
				size={35}
				color={disabled ? colors.secondary : '#ffffff'}
				style={{ padding: 0 }}
				onPress={() => _handlePress('previous')}
			/>

			{isPaused ? (
				<Ionicons
					name="pause-circle-sharp"
					size={open ? 60 : 35}
					color={disabled ? colors.secondary : colors.accent}
					onPress={() => _handlePress('pause')}
				/>
			) : (
				<Ionicons
					name="play-circle-sharp"
					size={open ? 60 : 35}
					color={disabled ? colors.secondary : colors.accent}
					onPress={() => _handlePress('play')}
				/>
			)}

			<Ionicons
				name="play-skip-forward-sharp"
				size={35}
				color={disabled ? colors.secondary : '#ffffff'}
				style={{ padding: 0 }}
				onPress={() => _handlePress('next')}
			/>
			{open && (
				<Ionicons
					name="repeat-sharp"
					size={35}
					color={disabled ? colors.secondary : '#ffffff'}
					style={{ padding: 0 }}
					onPress={() => _handlePress('loop')}
				/>
			)}
		</View>
	)
}
export default memo(ControlButtons)
