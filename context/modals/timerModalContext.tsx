import { TimerModelContext } from '@/hooks/modals/useTimerModal'
import { ReactElement, ReactNode, useState } from 'react'

export const TimerModalProvider = ({ children }: { children: ReactElement | ReactNode }): JSX.Element => {
	const [visible, setVisible] = useState(false)

	const showModal = () => {
		setVisible(true)
	}

	const hideModal = () => {
		setVisible(false)
	}

	return (
		<TimerModelContext.Provider
			value={{
				visible,
				showModal,
				hideModal
			}}
		>
			{children}
		</TimerModelContext.Provider>
	)
}
