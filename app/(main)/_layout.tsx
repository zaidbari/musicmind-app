import { MainContentArea } from '@/components/layouts/content/main'
import { MainSidebar } from '@/components/layouts/sidebar/main'
import InfoModal from '@/components/models/info'
import SearchModal from '@/components/models/search'
import { colors } from '@/constants/colors'
import { useDevice } from '@/hooks/useDevice'
import { useModal } from '@/hooks/useModal'
import { useSearch } from '@/hooks/useSearch'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

export default (): JSX.Element => {
	const [open, setOpen] = useState<boolean>(true)
	const device = useDevice()
	const { visible, hideModal, title, content } = useModal()
	const { searchVisible, setSearchVisible } = useSearch()

	useEffect(() => {
		if (device === 'phone') setOpen(false)
	}, [device])

	return (
		<View style={styles.mainLayoutContainer}>
			<MainSidebar open={open} setOpen={setOpen} />
			<MainContentArea open={open} />
			{visible && <InfoModal hideModal={hideModal} title={title} content={content} />}
			{searchVisible && <SearchModal setSearchVisible={setSearchVisible} />}
		</View>
	)
}

const styles = StyleSheet.create({
	mainLayoutContainer: {
		backgroundColor: colors.primary,
		flex: 1,
		flexDirection: 'row',
		gap: 5,
		position: 'relative'
	}
})
