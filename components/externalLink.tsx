import { Link } from 'expo-router'
import { openBrowserAsync } from 'expo-web-browser'
import { ComponentProps } from 'react'
import { Platform } from 'react-native'

export function ExternalLink(props: ComponentProps<typeof Link>): JSX.Element {
	return (
		<Link
			hrefAttrs={{
				target: '_blank'
			}}
			{...props}
			onPress={e => {
				if (Platform.OS !== 'web') {
					e.preventDefault()
					openBrowserAsync(props.href as string)
				}
			}}
		/>
	)
}
