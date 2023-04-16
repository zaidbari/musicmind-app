import { ReactElement, ReactNode } from 'react'
import { PlaylistModalProvider } from './playlistModalContext'
import { SearchModalProvider } from './searchModalContext'
import { InfoModalProvider } from './infoModalContext'

export const ModalProvider = ({ children }: { children: ReactNode | ReactElement }): JSX.Element => {
	return (
		<PlaylistModalProvider>
			<SearchModalProvider>
				<InfoModalProvider>{children}</InfoModalProvider>
			</SearchModalProvider>
		</PlaylistModalProvider>
	)
}
