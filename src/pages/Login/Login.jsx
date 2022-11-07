import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

import styles from './Login.module.scss'
import { auth } from '../../firebase'

const Login = () => {
	const [error, setError] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		const email = e.target[0].value
		const password = e.target[1].value

		try {
			await signInWithEmailAndPassword(auth, email, password)
			navigate('/')
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
						type="email"
						placeholder="Email"
						className={styles.regular_input}
					/>
					<input
						type="password"
						placeholder="Password"
						className={styles.regular_input}
					/>
					<button>Log in</button>
					{error && (
						<span className={styles.error_info}>
							Something went wrong!
						</span>
					)}
				</form>
				<p>
					You don't have an account?
					<Link to="/register">
						<span className={styles.color}> Sign up</span>
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Login
