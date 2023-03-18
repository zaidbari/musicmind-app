import AntDesign from '@expo/vector-icons/AntDesign'
import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'

import Colors from '@/constants/Colors'

type TProps = {
	name: React.ComponentProps<typeof AntDesign>['name']
	color: string
	size?: number | undefined
}

const TabBarIcon = (props: TProps): JSX.Element => <AntDesign size={props.size ?? 28} {...props} />

const TabLayout = (): JSX.Element => {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: Colors[colorScheme ?? 'light'].background,
					paddingBottom: 8,
					paddingTop: 8,
					borderTopWidth: 0
				}
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: 'Search',
					tabBarIcon: ({ color }) => <TabBarIcon name="search1" color={color} />
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					tabBarIcon: ({ color }) => <TabBarIcon name="setting" color={color} />
				}}
			/>
		</Tabs>
	)
}

export default TabLayout
