import 'react-native-gesture-handler'
import 'expo-router/entry'
import { Platform } from 'react-native'
import '@/utils/localization'
import * as Sentry from 'sentry-expo'
import { SENTRY_DSN } from '@/constants/urls'

Sentry.init({
	dsn: SENTRY_DSN,
	enableInExpoDevelopment: true,
	debug: false,
	tracesSampleRate: 1.0,
	attachScreenshot: true
})

if (Platform.OS === 'web' && document) {
	const originalWarn = console.warn
	console.warn = (message, ...optionalParams) => {
		if (typeof message === 'string') {
			if (/setNativeProps is deprecated. Please update props using React state instead./g.test(message)) return
		}
		originalWarn(message, ...optionalParams)
	}

	// get head element
	const head = document.getElementsByTagName('head')[0]

	// create a style tag in head
	const style = document.createElement('style')
	// set the style tag's innerHTML
	style.innerHTML = `
		* {
			-webkit-tap-highlight-color: transparent;
			-webkit-text-size-adjust: 100%;
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			outline: none !important;
		}

		::-webkit-scrollbar {
			display: none;
		}

		::-webkit-scrollbar-track {
			display: none;
		}

		::-webkit-scrollbar-thumb {
			display: none;
		}

		input, textarea, button {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			outline: none;
		}
	`

	// append the style tag to the head
	head.appendChild(style)
}
