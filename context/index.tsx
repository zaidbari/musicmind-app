import { ReactElement, ReactNode } from 'react'
import { AuthProvider } from './auth'
import { ModalProvider } from './modal'
import { SoundProvider } from './sound'

const Providers = ({ children }: { children: ReactNode | ReactElement }): JSX.Element => {
	return (
		<AuthProvider>
			<ModalProvider>
				<SoundProvider>{children}</SoundProvider>
			</ModalProvider>
		</AuthProvider>
	)
}

export default Providers
