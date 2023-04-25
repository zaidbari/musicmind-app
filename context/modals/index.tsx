import { ReactElement, ReactNode } from 'react'
import { InfoModalProvider } from './infoModalContext'
import { PlaylistModalProvider } from './playlistModalContext'
import { SearchModalProvider } from './searchModalContext'
import { TimerModalProvider } from './timerModalContext'

export const ModalProvider = ({ children }: { children: ReactNode | ReactElement }): JSX.Element => {
	return (
		<PlaylistModalProvider>
			<SearchModalProvider>
				<InfoModalProvider>
					<TimerModalProvider>{children}</TimerModalProvider>
				</InfoModalProvider>
			</SearchModalProvider>
		</PlaylistModalProvider>
	)
}
