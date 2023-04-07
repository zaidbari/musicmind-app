// import { Text as DefaultText, useColorScheme, View as DefaultView } from 'react-native'

// import Colors from '@/constants/Colors'

// type TProps = {
// 	light?: string
// 	dark?: string
// }

// type TThemeProps = {
// 	lightColor?: string
// 	darkColor?: string
// }

// export type TColorName = keyof typeof Colors.light & keyof typeof Colors.dark
// export type TTextProps = TThemeProps & DefaultText['props']
// export type TViewProps = TThemeProps & DefaultView['props']

// export const useThemeColor = (props: TProps, colorName: TColorName): string => {
// 	const theme = useColorScheme() ?? 'light'
// 	const colorFromProps = props[theme]

// 	return colorFromProps ?? Colors[theme][colorName]
// }

// export const Text = (props: TTextProps): JSX.Element => {
// 	const { style, lightColor, darkColor, ...otherProps } = props
// 	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

// 	return <DefaultText style={[{ color }, style]} {...otherProps} />
// }

// export const View = (props: TViewProps): JSX.Element => {
// 	const { style, lightColor, darkColor, ...otherProps } = props
// 	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

// 	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
// }
