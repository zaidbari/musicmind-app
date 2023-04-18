import { colors } from '@/constants/colors'
import { useState } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
export const Input = (props: TextInputProps) => {
	const [border, setBorder] = useState(colors.secondary)

	return (
		<TextInput
			{...props}
			placeholderTextColor={'#8e8e8e'}
			style={StyleSheet.flatten([props.style, styles.input, { borderColor: border }])}
			onFocus={() => setBorder(colors.accent)}
			onBlur={() => {
				setBorder(colors.secondary)
			}}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 5,
		borderWidth: 2,
		marginVertical: 8,
		backgroundColor: colors.secondary,
		fontSize: 18,
		color: 'white'
	}
})
