import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import axios from 'axios'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './App.css'

import LoginForm from './LoginForm'
// import UserInfo from "./UserInfo"
import NewEntryForm from './NewEntryForm'
import DateAccordion from './DateAccordions'
import Navbar from './Navbar'
import Home from './Home'
import RegisterForm from './RegisterForm'
import url from './Helpers'

const App = () => {
	const initialState = ""

	const [token, setToken] = useState(initialState)
	const [username, setUsername] = useState(initialState)
	// const [entries, setEntries] = useState([])

	// useEffect(() => {
    //     console.log("Updating entries!")
	// 	async function getEntries() {
    //         const resp = await axios.get(`${url}/entry/${username}`, {
    //             headers: {
    //                 Authorization: token
    //             }
    //         })
	// 		console.log(resp.data)
    //         // const entryList = resp.data.entries
    //         setEntries(resp.data.entries)
    //     }
    //     getEntries()

    //     // entries.map(entry => {
    //     //     const year = entry.entry_date.slice(0, 4)
    //     //     years.push(year)
    //     // })
    //     // console.log(years)
        
    //     // years.forEach(year => console.log(year))
    //     console.log(entries)
        
    // }, [token, username])

	library.add(faUser)
  
	return (
		<>
			<BrowserRouter>
				<Navbar username={username} token={token} setUsername={setUsername} setToken={setToken} className="my-1"/>
				<Routes>
					<Route exact path="/" element={<Home token={token}/>}/>
					<Route exact path="/login" element={<LoginForm setToken={setToken} setUsername={setUsername}/>}/>
					<Route exact path="/register" element={<RegisterForm token={token} username={username}/>}/>
					<Route exact path="/newEntry" element={<NewEntryForm token={token} username={username}/>}/>
					<Route exact path="/entries" element={<DateAccordion token={token} username={username}/>}/>
					<Route exact path="/:username" element={<Home/>}/>
				</Routes>
			</BrowserRouter>
			{
				token ?
				<h1>{username}</h1> :
				// <DateAccordion token={token} username={username}/> :
				<h1>{"Nope"}</h1>
			}
		</>
	)
}

export default App
