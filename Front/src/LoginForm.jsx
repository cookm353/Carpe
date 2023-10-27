import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import url from "./Helpers"
import "./LoginForm.css"

const LoginForm = ({ setToken, setUsername }) => {
    const initialState = {
        username: "",
        password: ""
    }
    const navigate = useNavigate()

    const[formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        let { name, value } = e.target
        
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, password } = formData
        setFormData(initialState)

        const resp = await axios.post(`${url}/auth/token`, {
            username, password
        })
        
        const {token} = resp.data
        setToken(token)
        setUsername(username)
        console.log("foo")
        navigate('/')
    }

    return (
        <form className="form container-flex" onSubmit={handleSubmit}>
            <div className="row my-2">
                <div className="col">
                <label className="mx-2" htmlFor="username">Username: </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={handleChange}
                    value={formData.username}
                />
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                    <label className="mx-2" htmlFor="password">Password: </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>
            </div>
            <button>Log in</button>
        </form>
    )
}

export default LoginForm