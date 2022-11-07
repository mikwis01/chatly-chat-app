import { doc, onSnapshot } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { db } from '../../firebase'

import styles from './ChatUsers.module.scss'

const ChatUsers = () => {
	const [chats, setChats] = useState([])

	const { currentUser } = useContext(AuthContext)
	const { dispatch } = useContext(ChatContext)

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(
				doc(db, 'userChats', currentUser.uid),
				(doc) => {
					console.log(doc.data())
					setChats(doc.data())
				}
			)

			return () => {
				unsub()
			}
		}

		currentUser.uid && getChats()
	}, [currentUser.uid])

	const handleSelect = (user) => {
		dispatch({ type: 'CHANGE_USER', payload: user })
	}

	console.log(chats)

	return (
		<>
			{chats &&
				Object.entries(chats)
					?.sort((a, b) => b[1].date - a[1].date)
					.map((chat) => (
						<div
							className={styles.container}
							key={chat[0]}
							onClick={() => {
								handleSelect(chat[1].userInfo)
							}}>
							<div
								className={styles.user_avatar}
								style={{
									backgroundImage: `url(${chat[1].userInfo.photoURL})`
								}}
							/>
							<div className={styles.user_info}>
								<span>{chat[1].userInfo.displayName}</span>
								<p>{chat[1].lastMessage?.text}</p>
							</div>
						</div>
					))}
		</>
	)
}

export default ChatUsers
