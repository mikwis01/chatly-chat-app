import MessageWrapper from '../MessageWrapper/MessageWrapper'
import ChatBoxInputPanel from '../ChatBoxInputPanel/ChatBoxInputPanel'

import styles from './ChatBox.module.scss'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'

const ChatBox = () => {
	const { data } = useContext(ChatContext)

	console.log(data)

	return (
		<div className={styles.container}>
			{data.chatId !== 'null' ? (
				<>
					<div className={styles.top_bar}>
						<span>{data.user?.displayName}</span>
					</div>
					<MessageWrapper />
					<ChatBoxInputPanel />
				</>
			) : (
				<div className={styles.pick_a_user_info}>
					<h3>Add or select a user to star chatting</h3>
				</div>
			)}
		</div>
	)
}

export default ChatBox
