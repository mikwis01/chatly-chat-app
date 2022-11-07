import { signOut } from 'firebase/auth'
import { FaSignInAlt } from 'react-icons/fa'
import { auth } from '../../firebase'

import styles from './LogoutBar.module.scss'

const LogoutBar = () => {
	return (
		<div className={styles.container}>
			<button onClick={() => signOut(auth)}>
				<FaSignInAlt />
			</button>
		</div>
	)
}

export default LogoutBar
