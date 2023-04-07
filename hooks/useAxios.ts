import { REFRESH_URL } from '@/constants/urls'
import { useAuth } from '@/context/auth'
import { useTokens } from '@/hooks/useTokens'
import { Tokens } from '@/types/tokens'
import api from '@/utils/api'
import axios, { AxiosInstance } from 'axios'

const useAxios = (): AxiosInstance => {
	const { getTokens, setTokens } = useTokens()
	const { signOut } = useAuth()

	api.interceptors.request.use(
		async config => {
			const tokens = await getTokens()

			if (tokens === null) {
				signOut()
				return config
			}

			const { access } = tokens

			if (!config.headers['Authorization']) config.headers['Authorization'] = `JWT ${access}`
			return config
		},
		error => {
			return Promise.reject(error)
		}
	)

	api.interceptors.response.use(
		response => response,
		async error => {
			const { response, config } = error

			if (error.code == 'ERR_CANCELED') return Promise.reject(error)
			if (response?.status !== 401) return Promise.reject(error)
			const tokens = await getTokens()

			if (tokens === null) {
				signOut()
				return Promise.reject(error)
			}

			const prevRequest = config
			if (response.data.code === 'token_not_valid') {
				prevRequest.sent = true

				try {
					const { data }: { data: Tokens } = await axios.post(
						REFRESH_URL,
						new FormData().append('refresh', tokens.refresh)
					)
					setTokens(data)
					prevRequest.headers['Authorization'] = `JWT ${data.access}`
					return await api(prevRequest)
				} catch (err) {
					console.log(err)
					signOut()
					return Promise.reject(err)
				}
			} else return Promise.reject(error)
		}
	)

	return api
}

export default useAxios
