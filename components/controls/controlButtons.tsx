import { colors } from '@/constants/colors'
import { useAuth } from '@/context/auth'
import { useSound } from '@/context/sound'
import { useTrackControls } from '@/hooks/tracks/useTrackControls'
import Ionicons from '@expo/vector-icons/Ionicons'
import { memo, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

function ControlButtons({ open, width }: { open: boolean; width: number }) {
	const { _play, _pause, _previous, _next, _toggleLoop, _shuffle, currentPlayingTrack, mediaPlayerAcquisition } =
		useSound()

	const { isAdmin } = useAuth()

	const [disabled, setDisabled] = useState(false)

	const { isPaused, isBuffering, isLoading } = useTrackControls()

	useEffect(() => {
		if (isBuffering) setDisabled(true)
		else setDisabled(false)

		if (currentPlayingTrack.current === null) setDisabled(true)
		else setDisabled(false)

		// eslint-disable-next-line react-hooks/exhaustive-deps
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
				open && { width, marginVertical: 20 }
			])}
		>
			{open && (mediaPlayerAcquisition.isShuffleBtnVisible || isAdmin) && (
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

			{!isLoading ? (
				isPaused ? (
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
				)
			) : (
				<ActivityIndicator size={55} color={colors.accent} />
			)}

			<Ionicons
				name="play-skip-forward-sharp"
				size={35}
				color={disabled ? colors.secondary : '#ffffff'}
				style={{ padding: 0 }}
				onPress={() => _handlePress('next')}
			/>
			{open && (mediaPlayerAcquisition.isRepeatBtnVisible || isAdmin) && (
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
