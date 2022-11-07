import { useContext, useState } from 'react'
import {
	collection,
	query,
	where,
	getDocs,
	getDoc,
	setDoc,
	doc,
	updateDoc,
	serverTimestamp
} from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'

import styles from './SearchBar.module.scss'

const SearchBar = () => {
	const [username, setUsername] = useState('')
	const [userFound, setUserFound] = useState('')
	const [error, setError] = useState(false)

	const { currentUser } = useContext(AuthContext)

	const handleSearch = async () => {
		const q = query(
			collection(db, 'users'),
			where('displayName', '==', username)
		)

		try {
			const querySnapshot = await getDocs(q)
			querySnapshot.forEach((doc) => {
				setUserFound(doc.data())
			})
		} catch (error) {
			setError(true)
		}
	}

	const handleKeyDown = (e) => {
		e.code === 'Enter' && handleSearch()
	}

	const handleAddUser = async () => {
		const mergedIds =
			currentUser.uid > userFound.uid
				? currentUser.uid + userFound.uid
				: userFound.uid + currentUser.uid
		try {
			const res = await getDoc(doc(db, 'chats', mergedIds))

			if (!res.exists()) {
				await setDoc(doc(db, 'chats', mergedIds), { messages: [] })

				await updateDoc(doc(db, 'userChats', currentUser.uid), {
					[mergedIds + '.userInfo']: {
						uid: userFound.uid,
						displayName: userFound.displayName,
						photoURL: userFound.photoURL
					},
					[mergedIds + '.date']: serverTimestamp()
				})

				await updateDoc(doc(db, 'userChats', userFound.uid), {
					[mergedIds + '.userInfo']: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL
					},
					[mergedIds + '.date']: serverTimestamp()
				})
			}
		} catch (error) {}

		setUserFound(null)
		setUsername('')
	}

	return (
		<div className={styles.container}>
			<div className={styles.search_wrapper}>
				<input
					type="text"
					placeholder="Search ... (press ENTER)"
					onKeyDown={handleKeyDown}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			{error && <span>No users found!</span>}
			{userFound && (
				<div className={styles.user_found} onClick={handleAddUser}>
					<div
						className={styles.user_avatar}
						style={{
							backgroundImage: `url(${userFound.photoURL})`
						}}
					/>
					<span>{userFound.displayName}</span>
				</div>
			)}
		</div>
	)
}

export default SearchBar
