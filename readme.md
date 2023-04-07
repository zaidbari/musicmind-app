# MusicMind app for Android, iOS and [Web](https://musicmind.nu)

## Development requirements

- Node.js (v16.0.0) - [Download](https://nodejs.org/en/download/)
- Expo CLI - [Installation](https://docs.expo.io/get-started/installation/)
- Expo Go app - [Download](https://expo.dev/client)
- Expo account - [Sign up](https://expo.dev/signup)
- EAS CLI - [Installation](https://docs.expo.io/build/eas-cli/)

## Development

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npx expo start` to start the development server
4. Run `npx expo start --web --port=19006` to start the web development server
5. Use `--clear` to clear the babel config cache
6. Use `--no-dev` to disable development mode
7. Use `--offline` to enable offline mode
8. Use `--https` to enable HTTPS
9. Use `--tunnel` to enable tunneling
10. Use `--lan` to enable LAN
11. Use `--dev-client` to enable the development client
12. Use `--minify` to enable minification

## Deployment

1. Run `npx eas build --platform=android` to build the Android app
2. Run `npx eas build --platform=ios` to build the iOS app
3. Run `npx expo export:web` to build the web app
4. Run `npx eas submit --platform=android` to submit the Android app
5. Run `npx eas submit --platform=ios` to submit the iOS app

Additionally,

1. Use `--profile=production` to build for production.
2. Use `--profile=development` to build for development.
3. Use `--profile=release` to build for release.
