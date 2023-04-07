export const logger = {
	log: (message: any, ...rest: any) => {
		if (message.code !== 'ERR_CANCELED') console.log(message, ...rest)
	}
}
