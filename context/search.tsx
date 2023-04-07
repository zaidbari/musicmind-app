import { SearchContext } from '@/hooks/useSearch'
import { ReactElement, ReactNode, useState } from 'react'

export const SearchProvider = ({ children }: { children: ReactNode | ReactElement }): JSX.Element => {
	const [searchVisible, setSearchVisible] = useState(false)

	return (
		<SearchContext.Provider
			value={{
				searchVisible,
				setSearchVisible
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
