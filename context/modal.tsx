import { ModalContext } from '@/hooks/useModal'
import { ReactElement, ReactNode, useState } from 'react'
import { SearchProvider } from './search'

export const ModalProvider = ({ children }: { children: ReactNode | ReactElement }): JSX.Element => {
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
		<ModalContext.Provider
			value={{
				visible,
				title,
				content,
				showModal,
				hideModal
			}}
		>
			<SearchProvider>{children}</SearchProvider>
		</ModalContext.Provider>
	)
}
