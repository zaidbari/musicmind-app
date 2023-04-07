import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export type SearchContextType = {
	searchVisible: boolean
	setSearchVisible: Dispatch<SetStateAction<boolean>>
}

export const SearchContext = createContext<SearchContextType>({
	searchVisible: false,
	setSearchVisible: () => {}
})

export const useSearch = (): SearchContextType => useContext(SearchContext)
