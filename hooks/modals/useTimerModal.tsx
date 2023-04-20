import { createContext, useContext } from 'react'

export type TimerModelContextType = {
	visible: boolean
	showModal: () => void
	hideModal: () => void
}

export const TimerModelContext = createContext<TimerModelContextType>({
	visible: false,
	showModal: () => {},
	hideModal: () => {}
})

export const useTimerModal = (): TimerModelContextType => useContext(TimerModelContext)
