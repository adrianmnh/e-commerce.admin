import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import AdminContextProvider from './Context/AdminContext'

const App = () => {
	return (
		<AdminContextProvider>
			<Navbar />
			<Admin />
		</AdminContextProvider>
	)
}

export default App
