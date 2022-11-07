import { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

import styles from './Message.module.scss'

const Message = ({ message }) => {
	const { currentUser } = useContext(AuthContext)
	const { data } = useContext(ChatContext)

	const ref = useRef()

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: 'smooth' })
	}, [message])

	return (
		<div
			className={`${styles.container} ${
				message.senderId === currentUser.uid && styles.owner
			}`}>
			<div className={styles.info}>
				<div
					className={styles.avatar}
					style={{
						backgroundImage: `url(${
							message.senderId === currentUser.uid
								? currentUser.photoURL
								: data.user.photoURL
						})`
					}}
				/>
				{/* <p>just now</p> */}
			</div>
			<div className={styles.content}>
				<p>{message.text}</p>
				{message.img && (
					<img
						className={styles.message_image}
						src={message.img}
						alt="Visual content"
					/>
				)}
			</div>
		</div>
	)
}

export default Message
