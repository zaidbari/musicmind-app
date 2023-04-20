import { colors } from '@/constants/colors'
import { useSound } from '@/context/sound'
import { useTimerModal } from '@/hooks/modals'
import { memo, useState } from 'react'
import { Platform, StyleSheet, Switch, Text, View } from 'react-native'
import { IconButton } from '../buttons/iconButton'

const TimerControls = ({ width }: { width: number }): JSX.Element => {
	const [isEnabled, setIsEnabled] = useState<boolean>(false)
	const { timerCount, isTimerEnabled, setTimerEnabled } = useSound()
	const { showModal } = useTimerModal()

	const convertToReadableHoursFromSeconds = (time: number): string => {
		const hours = Math.floor(time / 3600)
		const minutes = Math.floor((time % 3600) / 60)
		const seconds = Math.floor((time % 3600) % 60)

		return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
			seconds < 10 ? `0${seconds}` : seconds
		}`
	}

	const toggleSwitch = () => {
		setTimerEnabled(previousState => !previousState)
		setIsEnabled(previousState => !previousState)
	}

	const showTimerModal = () => {
		showModal()
	}

	return (
		<View style={StyleSheet.flatten([styles.row, { width }])}>
			<Switch
				trackColor={{ false: colors.secondary, true: colors.accent }}
				thumbColor={isEnabled ? '#fff' : colors.secondary}
				onValueChange={toggleSwitch}
				value={isEnabled}
				{...Platform.select({
					web: {
						activeThumbColor: '#fff'
					}
				})}
			/>
			<View style={styles.row}>
				<Text style={{ color: isTimerEnabled ? '#fff' : colors.secondary }}>
					{convertToReadableHoursFromSeconds(timerCount)}
				</Text>
				<IconButton
					icon="ios-stopwatch-outline"
					size={10}
					style={{ marginRight: 0, marginLeft: 5, paddingVertical: 4, paddingHorizontal: 6 }}
					onPress={showTimerModal}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10
	}
})

export default memo(TimerControls)
