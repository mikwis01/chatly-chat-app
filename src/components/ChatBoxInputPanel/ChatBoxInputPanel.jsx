import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc
} from 'firebase/firestore'
import { useContext, useState } from 'react'
import { FaImage } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { db, storage } from '../../firebase'
import { v4 as uuid } from 'uuid'

import styles from './ChatBoxInputPanel.module.scss'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const ChatBoxInputPanel = () => {
	const [text, setText] = useState('')
	const [img, setImg] = useState('')

	const { currentUser } = useContext(AuthContext)
	const { data } = useContext(ChatContext)

	const handleSend = async () => {
		if (img) {
			const storageRef = ref(storage, uuid())

			await uploadBytesResumable(storageRef, img).then(() => {
				getDownloadURL(storageRef).then(async (downloadURL) => {
					try {
						await updateDoc(doc(db, 'chats', data.chatId), {
							messages: arrayUnion({
								id: uuid(),
								text,
								senderId: currentUser.uid,
								date: Timestamp.now(),
								img: downloadURL
							})
						})
					} catch (err) {
						console.log(err)
					}
				})
			})
		} else {
			await updateDoc(doc(db, 'chats', data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now()
				})
			})
		}

		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[data.chatId + '.lastMessage']: {
				text
			},
			[data.chatId + '.date']: serverTimestamp()
		})

		await updateDoc(doc(db, 'userChats', data.user.uid), {
			[data.chatId + '.lastMessage']: {
				text
			},
			[data.chatId + '.date']: serverTimestamp()
		})

		setText('')
		setImg('')
	}

	return (
		<div className={styles.container}>
			<input
				type="text"
				placeholder="Start typing ..."
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<div className={styles.send}>
				<input
					type="file"
					id="chatFile"
					onChange={(e) => setImg(e.target.files[0])}
				/>
				<label htmlFor="chatFile">
					<FaImage />
				</label>
				<button onClick={handleSend}>Send</button>
			</div>
		</div>
	)
}

export default ChatBoxInputPanel
