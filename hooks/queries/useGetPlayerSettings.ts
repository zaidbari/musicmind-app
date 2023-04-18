import { MEDIAPLAYER_ACQUISITION_URL, TIMER_ACQUISITION_URL } from '@/constants/urls'
import useAxios from '@/hooks/useAxios'
import { TMediaPlayerAcquisition, TTimerAcquisition } from '@/types/playerSettings'
import { logger } from '@/utils/logger'
import axios, { CancelToken } from 'axios'
import { useCallback, useEffect, useState } from 'react'

type TGetPlayerSettingsReturnType = {
	mediaPlayerAcquisition: TMediaPlayerAcquisition
	timerAcquisition: TTimerAcquisition
}

export const useGetPlayerSettings = (): TGetPlayerSettingsReturnType => {
	const api = useAxios()

	const [mediaPlayerAcquisition, setMediaPlayerAcquisition] = useState<TMediaPlayerAcquisition>({
		isShuffleBtnVisible: false,
		isRepeatBtnVisible: false
	})

	const [timerAcquisition, setTimerAcquisition] = useState<TTimerAcquisition>({
		timer_value_integer: 0,
		timer_enabled_bool: false
	})

	const fetchPlayerSettings = useCallback(async (unmounted: boolean, token: CancelToken) => {
		try {
			if (!unmounted) {
				const [mediaPlayerData, timerData] = await Promise.all([
					api.get(MEDIAPLAYER_ACQUISITION_URL, { cancelToken: token }),
					api.get(TIMER_ACQUISITION_URL, { cancelToken: token })
				])
				if (mediaPlayerData.data.length) setMediaPlayerAcquisition(mediaPlayerData.data[0])
				if (timerData.data.length) setTimerAcquisition(timerData.data[0])
			}
		} catch (error) {
			logger.sentry(error, {
				tags: {
					section: 'getMediaPlayerAcquisition'
				}
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		let unmounted = false
		let source = axios.CancelToken.source()

		fetchPlayerSettings(unmounted, source.token)
		return () => {
			unmounted = true
			source.cancel('Cancelling in cleanup')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { mediaPlayerAcquisition, timerAcquisition }
}
