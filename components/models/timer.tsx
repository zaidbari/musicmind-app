import { colors } from '@/constants/colors'
import { useDevice } from '@/context/device'
import { useSound } from '@/context/sound'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { Input } from '../inputs/input'

export type InfoModalProps = {
	hideModal: () => void
}

function TimerModal({ hideModal }: InfoModalProps): JSX.Element {
	const { height, width } = useWindowDimensions()
	const [input, setInput] = React.useState<string>('')
	const [error, setError] = React.useState<boolean>(false)

	const { setTimer } = useSound()
	const { t } = useTranslation()
	const device = useDevice()

	const _handleTimer = () => {
		setError(false)
		if (input && !isNaN(Number(input)) && Number(input) > 0) {
			setTimer(Number(input) * 60)
			hideModal()
		} else {
			setError(true)
		}
	}

	return (
		<View style={StyleSheet.flatten([styles.container, { width, height }])}>
			<View style={StyleSheet.flatten([styles.contentContainer])}>
				<View style={StyleSheet.flatten([device !== 'phone' ? styles.row : { flexDirection: 'column' }])}>
					<Input
						keyboardType="numbers-and-punctuation"
						style={{ flexGrow: 2 }}
						autoFocus
						placeholder={t('inputs.setTimer') as string}
						value={input}
						onChangeText={setInput}
					/>
					<Pressable onPress={hideModal} style={StyleSheet.flatten([styles.button, styles.secondaryButton])}>
						<Text style={StyleSheet.flatten([styles.text, { color: 'white' }])}>{t('close')}</Text>
					</Pressable>
					<Pressable onPress={_handleTimer} style={styles.button}>
						<Text style={styles.text}>{t('OK')}</Text>
					</Pressable>
				</View>
				{error && <Text style={styles.content}>{t('inputs.invalidMinutes')}</Text>}
			</View>
		</View>
	)
}

export default memo(TimerModal)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		position: 'absolute',
		top: 0,
		left: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	contentContainer: {
		backgroundColor: colors.primary,
		borderRadius: 10,
		padding: 20
	},
	title: {
		color: colors.accent,
		textAlign: 'center',
		fontSize: 20,
		marginTop: 8,
		fontWeight: 'bold'
	},
	content: {
		color: 'red',
		marginVertical: 10
	},
	secondaryButton: {
		backgroundColor: colors.secondary,
		borderColor: colors.secondary
	},
	button: {
		flexGrow: 1,
		paddingVertical: 8,
		borderRadius: 5,
		marginLeft: 10,
		flexDirection: 'row',
		borderWidth: 2,
		justifyContent: 'center',
		backgroundColor: colors.accent,
		borderColor: colors.accent
	},
	text: {
		fontSize: 16,
		marginHorizontal: 8,
		textAlign: 'center',
		fontWeight: 'bold'
	}
})
