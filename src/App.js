import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
	const { currentUser } = useContext(AuthContext)

	const ProtectedRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to="/login" />
		}

		return children
	}

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Landing />
							</ProtectedRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
