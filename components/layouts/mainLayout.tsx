import { MainContentArea } from '@/components/layouts/content/main'
import { MainSidebar } from '@/components/layouts/sidebar/main'
import { InfoModal, PlaylistModal, SearchModal } from '@/components/models'
import { colors } from '@/constants/colors'
import { useDevice } from '@/context/device'
import { useInfoModal, usePlaylistModal, useSearchModal } from '@/hooks/modals'
import { FC, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

const MainLayout = (): JSX.Element => {
	const [open, setOpen] = useState<boolean>(true)

	const device = useDevice()
	const { visible, hideModal, title, content } = useInfoModal()
	const { searchVisible, setSearchVisible } = useSearchModal()
	const { visible: playlistVisible, hideModal: hidePlaylistModal } = usePlaylistModal()

	useEffect(() => {
		if (device === 'phone') setOpen(false)
	}, [device])

	return (
		<View style={styles.mainLayoutContainer}>
			<MainSidebar open={open} setOpen={setOpen} />
			<MainContentArea open={open} />

			{/* Modals will be rendered on top of every component */}
			{visible && <InfoModal hideModal={hideModal} title={title} content={content} />}
			{searchVisible && <SearchModal setSearchVisible={setSearchVisible} />}
			{playlistVisible && <PlaylistModal hideModal={hidePlaylistModal} />}
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

export default MainLayout
