import { ReactElement, ReactNode } from 'react'
import { AuthProvider } from './auth'
import { ModalProvider } from './modal'
import { SoundProvider } from './sound'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { DeviceProvider } from './device'

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
