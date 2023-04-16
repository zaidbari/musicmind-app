import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { ReactElement, ReactNode } from 'react'
import { AuthProvider } from './auth'
import { DeviceProvider } from './device'
import { ModalProvider } from './modals'
import { SoundProvider } from './sound'

const Providers = ({ children }: { children: ReactNode | ReactElement }): JSX.Element => {
	return (
		<DeviceProvider>
			<ActionSheetProvider>
				<AuthProvider>
					<ModalProvider>
						<SoundProvider>{children}</SoundProvider>
					</ModalProvider>
				</AuthProvider>
			</ActionSheetProvider>
		</DeviceProvider>
	)
}

export default Providers
