import { colors } from '@/constants/colors'
import { Dispatch, memo, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { Input } from '../inputs/input'

type SearchModalProps = {
	setSearchVisible: Dispatch<SetStateAction<boolean>>
}

function SearchModal({ setSearchVisible }: SearchModalProps): JSX.Element {
	const { width } = useWindowDimensions()
	const { t } = useTranslation()

	const _handleSearch = () => {
		setSearchVisible(false)
	}

	return (
		<View style={[styles.container, { width }]}>
			<Input autoFocus placeholder={t('inputs.search') as string} style={{ flexGrow: 2, marginLeft: 12 }} />
			<Pressable onPress={_handleSearch} style={styles.button}>
				<Text style={styles.text}>{t('close')}</Text>
			</Pressable>
		</View>
	)
}

export default memo(SearchModal)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		position: 'absolute',
		top: 0,
		left: 0,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flexDirection: 'row'
	},
	button: {
		paddingVertical: 8,
		backgroundColor: colors.accent,
		borderRadius: 5,
		marginVertical: 8,
		marginHorizontal: 12,
		flexDirection: 'row',
		borderWidth: 2,
		borderColor: colors.accent,
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
