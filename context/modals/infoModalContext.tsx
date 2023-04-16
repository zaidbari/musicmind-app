import { InfoModalContext } from '@/hooks/modals/useInfoModal'
import { ReactElement, ReactNode, useState } from 'react'

export const InfoModalProvider = ({ children }: { children: ReactNode | ReactElement }): JSX.Element => {
	const [visible, setVisible] = useState(false)
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	const showModal = ({ title, content }: { title: string; content: string }) => {
		setVisible(true)
		setTitle(title)
		setContent(content)
	}

	const hideModal = () => {
		setVisible(false)
		setTitle('')
		setContent('')
	}

	return (
		<InfoModalContext.Provider
			value={{
				visible,
				title,
				content,
				showModal,
				hideModal
			}}
		>
			{children}
		</InfoModalContext.Provider>
	)
}
