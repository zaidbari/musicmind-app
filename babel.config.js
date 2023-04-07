module.exports = function (api) {
	api.cache(true)
	return {
		presets: [ "babel-preset-expo" ],
		plugins: [
			require.resolve("expo-router/babel"),
			[ "module-resolver", {
				"alias": {
					"@/components": "./components",
					"@/app": "./app",
					"@/assets": "./assets",
					"@/constants": "./constants",
					"@/utils": "./utils",
					"@/context": "./context",
					"@/services": "./services",
					"@/types": "./types",
					"@/hooks": "./hooks",
					"@/stacks": "./stacks",
				},
				extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
			},
			],
			'@babel/plugin-proposal-export-namespace-from',
			'react-native-reanimated/plugin'
		],
	}
}
