import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import LoginForm from './LoginForm'
// import UserInfo from "./UserInfo"
import NewEntryForm from './NewEntryForm'
import DateAccordion from './DateAccordions'
import Navbar from './Navbar'
import Home from './Home'
import RegisterForm from './RegisterForm'

const App = () => {
	const initialState = ""

	const [token, setToken] = useState(initialState)
	const [username, setUsername] = useState(initialState)
  
	return (
		<>
		{/* Open Unit41 for help on React Router! */}
			<BrowserRouter>
				<Navbar username={username} setUsername={setUsername} setToken={setToken} className="my-1"/>
				<Routes>
					<Route exact path="/" element={<Home token={token}/>}/>
					<Route exact path="/login" element={<LoginForm setToken={setToken} setUsername={setUsername}/>}/>
					<Route exact path="/register" element={<RegisterForm/>}/>
					{/* <Route exact path="/:username" element={</>}/> */}
				</Routes>
			</BrowserRouter>
			{
				token ?
				<h1>{username}</h1> :
				<h1>{"Nope"}</h1>
			}
		</>
	)
}

export default App
