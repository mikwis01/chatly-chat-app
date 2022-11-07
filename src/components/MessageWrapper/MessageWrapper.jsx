import styles from './MessageWrapper.module.scss'
import Message from '../Message/Message'

import { ChatContext } from '../../context/ChatContext'
import { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

const MessageWrapper = () => {
	const [messages, setMessages] = useState([])
	const { data } = useContext(ChatContext)

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
			doc.exists() && setMessages(doc.data().messages)
		})

		return () => {
			unsub()
		}
	}, [data.chatId])

	return (
		<div className={styles.container}>
			{messages.map((message) => (
				<Message message={message} key={message.id} />
			))}
		</div>
	)
}

export default MessageWrapper
