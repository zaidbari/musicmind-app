import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
import { Platform, Text, View } from 'react-native'

type LinkComponentProps = {
	open: boolean
	deviceType: string
	icon: keyof typeof Ionicons.glyphMap
	href: string
	title: string
}

export function LinkComponent({ open, deviceType, icon, href, title }: LinkComponentProps): JSX.Element {
	return (
		<Link href={href}>
			<View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
				<Ionicons name={icon} size={deviceType === 'phone' ? 30 : 24} color={'white'} />
				{open && (
					<Text style={{ fontSize: Platform.OS === 'android' ? 20 : 16, color: 'white', marginLeft: 10 }}>{title}</Text>
				)}
			</View>
		</Link>
	)
}
