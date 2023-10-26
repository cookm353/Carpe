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
	const initialState = {
		token: "",
		// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvb2ttMzUzIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjk2NjE2NTkzfQ.PcGYEmm3OyhotPLOupa7360gPo2_4Pcz0efWaFIVM7Y",
		username: ""
	}

	const [token, setToken] = useState(initialState)
  
	return (
		<>
		{/* Open Unit41 for help on React Router! */}
			<BrowserRouter>
				<Navbar token={token} setToken={setToken} className="my-1"/>
				<Routes>
					<Route exact path="/" element={<Home token={token}/>}/>
					<Route exact path="/login" element={<LoginForm setToken={setToken}/>}/>
					<Route exact path="/register" element={<RegisterForm/>}/>
					{/* <Route exact path="/:username" element={</>}/> */}
				</Routes>
			</BrowserRouter>
			{
				token ?
				<h1>{token.username}</h1> :
				<h1>{"Nope"}</h1>
			}
		</>
	)
}

export default App
