import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { FaUserPlus } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Register.module.scss'

const Register = () => {
	const [error, setError] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		const username = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value
		const file = e.target[3].files[0]

		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			const date = new Date().getTime()
			const storageRef = ref(storage, `${username + date}`)

			await uploadBytesResumable(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(async (downloadURL) => {
					try {
						await updateProfile(res.user, {
							displayName: username,
							photoURL: downloadURL
						})

						await setDoc(doc(db, 'users', res.user.uid), {
							uid: res.user.uid,
							displayName: username,
							email,
							photoURL: downloadURL
						})

						await setDoc(doc(db, 'userChats', res.user.uid), {})
						navigate('/')
					} catch (err) {
						console.log(err)
						setError(true)
					}
				})
			})
		} catch (error) {
			setError(true)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.form_container}>
				<span className={styles.logo}>Chatly</span>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Username"
						className={styles.regular_input}
					/>
					<input
						type="email"
						placeholder="Email"
						className={styles.regular_input}
					/>
					<input
						type="password"
						placeholder="Password"
						className={styles.regular_input}
					/>
					<input
						type="file"
						id="filePicker"
						className={styles.original_file}
					/>
					<label htmlFor="filePicker">
						<FaUserPlus />
						Choose an avatar
					</label>
					<button>Sign up</button>
					{error && (
						<span className={styles.error_info}>
							Something went wrong!
						</span>
					)}
				</form>
				<p>
					You already have an account?
					<Link to="/login">
						<span className={styles.color}> Log in</span>
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Register
