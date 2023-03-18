import { Link } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { Platform } from 'react-native'

export const ExternalLink = (props: React.ComponentProps<typeof Link>): JSX.Element => {
	return (
		<Link
			hrefAttrs={{
				target: '_blank'
			}}
			{...props}
			onPress={e => {
				if (Platform.OS !== 'web') {
					e.preventDefault()
					WebBrowser.openBrowserAsync(props.href as string)
				}
			}}
		/>
	)
}
