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
					"@/types": "./types",
				},
				extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
			},
			],
			'@babel/plugin-proposal-export-namespace-from'
		],
	}
}
