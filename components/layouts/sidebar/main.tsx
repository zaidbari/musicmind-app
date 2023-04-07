import { colors } from '@/constants/colors'
import { useDevice } from '@/hooks/useDevice'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native'
import { MainLinks } from './links/mainLinks'
import TrackControls from '@/components/controls'

type MainSidebarProps = {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

export function MainSidebar({ open, setOpen }: MainSidebarProps): JSX.Element {
	const deviceType = useDevice()
	const { height, width } = useWindowDimensions()
	const [sideWidth, setSideWidth] = useState(270)

	useEffect(() => {
		if (deviceType === 'phone') {
			setSideWidth(width)
		}
	}, [])

	return (
		<View style={{ width: open ? sideWidth : 40, height }}>
			{deviceType !== 'phone' ? (
				<Image
					source={{ uri: '/assets/images/music_mind_logo.png' }}
					onError={console.error}
					style={styles.logo}
					contentFit="contain"
					contentPosition={'left'}
				/>
			) : (
				<Pressable onPress={() => setOpen(prev => !prev)} style={styles.button}>
					<Ionicons name={open ? 'ios-close' : 'menu'} size={20} color={'#ffffff'} style={{ padding: 0 }} />
				</Pressable>
			)}
			<View style={{ padding: 10, justifyContent: 'space-between', flexDirection: 'column', flex: 1 }}>
				<MainLinks open={open} deviceType={deviceType} />
				<TrackControls open={open} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.secondary,
		padding: 6,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		width: 34,
		height: 38,
		margin: 12
	},
	logo: {
		width: 120,
		height: 70,
		marginLeft: 10
	}
})
