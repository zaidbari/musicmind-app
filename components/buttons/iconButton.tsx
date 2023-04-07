import { colors } from '@/constants/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native'

type IconButtonProps = PressableProps & {
	icon: keyof typeof Ionicons.glyphMap
	style?: ViewStyle
}

export function IconButton({ icon, style, ...props }: IconButtonProps): JSX.Element {
	return (
		<Pressable style={StyleSheet.flatten([styles.iconButton, style && style])} {...props}>
			{({ pressed }) => (
				<Ionicons name={icon} size={20} color={pressed ? colors.accent : 'white'} style={{ padding: 0 }} />
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	iconButton: {
		backgroundColor: colors.secondary,
		padding: 8,
		borderRadius: 8,
		marginRight: 12
	}
})
