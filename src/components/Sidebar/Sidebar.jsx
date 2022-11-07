import Navbar from '../Navbar/Navbar'
import SearchBar from '../SearchBar/SearchBar'
import ChatUsers from '../ChatUsers/ChatUsers'

import styles from './Sidebar.module.scss'
import LogoutBar from '../LogoutBar/LogoutBar'

const Sidebar = () => {
	return (
		<div className={styles.container}>
			<Navbar />
			<SearchBar />
			<ChatUsers />
			<LogoutBar />
		</div>
	)
}

export default Sidebar
