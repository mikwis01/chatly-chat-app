import styles from './Navbar.module.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
	const { currentUser } = useContext(AuthContext)

	return (
		<div className={styles.container}>
			<span className={styles.logo}>Chatly</span>
			<div className={styles.user}>
				<div
					style={{ backgroundImage: `url(${currentUser.photoURL})` }}
				/>
				<span>{currentUser.displayName}</span>
			</div>
		</div>
	)
}

export default Navbar
