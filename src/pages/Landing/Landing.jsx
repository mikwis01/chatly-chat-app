import Sidebar from '../../components/Sidebar/Sidebar'
import ChatBox from '../../components/ChatBox/ChatBox'

import styles from './Landing.module.scss'

const Landing = () => {
	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<Sidebar />
				<ChatBox />
			</div>
		</div>
	)
}

export default Landing
