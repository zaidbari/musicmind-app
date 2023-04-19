import { colors } from './colors'

const fw: 'bold' | 'normal' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined = 'bold'
const inter: 'dark' | 'light' | undefined = 'dark'

export const ACTION_MENU_STYLES = {
	userInterfaceStyle: inter,
	showSeparators: true,
	containerStyle: {
		backgroundColor: colors.primary
	},
	separatorStyle: {
		backgroundColor: colors.secondary
	},
	titleTextStyle: {
		color: colors.accent,
		fontWeight: fw,
		fontSize: 20
	},
	textStyle: {
		color: 'white',
		fontSize: 16
	},
	useModal: true
}
