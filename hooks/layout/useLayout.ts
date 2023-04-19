import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useLayout = (): {
	width: number
	setItemsCount: Dispatch<SetStateAction<number>>
	setLayoutWidth: Dispatch<SetStateAction<number>>
} => {
	const [width, setWidth] = useState<number>(200)
	const [itemsCount, setItemsCount] = useState<number>(4)
	const [layoutWidth, setLayoutWidth] = useState<number>(880)

	useEffect(() => {
		if (layoutWidth) {
			setWidth((layoutWidth - 20 * itemsCount - 1) / itemsCount)
		}
	}, [layoutWidth, itemsCount])

	return { width, setItemsCount, setLayoutWidth }
}
