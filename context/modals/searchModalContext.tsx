import { SearchModalContext } from '@/hooks/modals/useSearchModal'
import { ReactElement, ReactNode, useState } from 'react'

export const SearchModalProvider = ({ children }: { children: ReactNode | ReactElement }): JSX.Element => {
	const [searchVisible, setSearchVisible] = useState(false)

	return (
		<SearchModalContext.Provider
			value={{
				searchVisible,
				setSearchVisible
			}}
		>
			{children}
		</SearchModalContext.Provider>
	)
}
