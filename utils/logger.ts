export const logger = {
	log: (message: any, ...rest: any) => {
		if (message.code !== 'ERR_CANCELED' && message != 'Player is not loaded') console.log(message, ...rest)
	}
}
