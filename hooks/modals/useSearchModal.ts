import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export type SearchContextType = {
	searchVisible: boolean
	setSearchVisible: Dispatch<SetStateAction<boolean>>
}

export const SearchModalContext = createContext<SearchContextType>({
	searchVisible: false,
	setSearchVisible: () => {}
})

export const useSearchModal = (): SearchContextType => useContext(SearchModalContext)
