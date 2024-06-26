import { createContext, useContext } from 'react'

export type ModelContextType = {
	visible: boolean
	title: string
	content: string | React.ReactElement
	showModal: ({ title, content }: { title: string; content: string }) => void
	hideModal: () => void
}

export const InfoModalContext = createContext<ModelContextType>({
	visible: false,
	title: '',
	content: '',
	showModal: ({ title, content }: { title: string; content: string | React.ReactElement }) => {},
	hideModal: () => {}
})

export const useInfoModal = (): ModelContextType => useContext(InfoModalContext)
