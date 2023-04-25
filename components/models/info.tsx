import { colors } from '@/constants/colors'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'

export type InfoModalProps = {
	hideModal: () => void
	title: string
	content: string | React.ReactElement
}
function Modal({ hideModal, title, content }: InfoModalProps): JSX.Element {
	const { height, width } = useWindowDimensions()
	const { t } = useTranslation()
	return (
		<View style={[styles.container, { width, height }]}>
			<View style={[styles.contentContainer, { width: width * 0.8 }]}>
				<Text style={styles.title}>{title}</Text>
				{typeof content === 'string' ? <Text style={styles.content}>{t(content)}</Text> : content}
				<Pressable onPress={hideModal} style={styles.button}>
					<Text style={styles.text}>{t('close')}</Text>
				</Pressable>
			</View>
		</View>
	)
}

export default memo(Modal)

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
	contentContainer: {
		backgroundColor: colors.primary,
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		color: colors.accent,
		textAlign: 'center',
		fontSize: 20,
		marginTop: 8,
		fontWeight: 'bold'
	},
	content: {
		color: 'white',
		textAlign: 'center',
		marginVertical: 10
	},
	button: {
		width: 100,
		paddingVertical: 6,
		backgroundColor: colors.accent,
		borderRadius: 4,
		marginVertical: 8,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	text: {
		color: colors.primary,
		fontSize: 14,
		marginHorizontal: 8,
		textAlign: 'center',
		fontWeight: 'bold'
	}
})
