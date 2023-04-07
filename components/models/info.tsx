import { colors } from '@/constants/colors'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'

export type InfoModalProps = {
	hideModal: () => void
	title: string
	content: string
}
function Modal({ hideModal, title, content }: InfoModalProps): JSX.Element {
	const { height, width } = useWindowDimensions()
	const { t } = useTranslation()
	return (
		<View style={[styles.container, { width, height }]}>
			<View style={[styles.contentContainer, { width: width / 1.3 }]}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.content}>{content}</Text>
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
		paddingVertical: 8,
		backgroundColor: colors.accent,
		borderRadius: 5,
		marginVertical: 8,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	text: {
		color: colors.primary,
		fontSize: 16,
		marginHorizontal: 8,
		textAlign: 'center',
		fontWeight: 'bold'
	}
})
