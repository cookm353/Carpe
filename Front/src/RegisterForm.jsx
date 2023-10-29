import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import url from "./Helpers";

const RegisterForm = () => {
    const initialState = {
        username: "",
        email: "",
        firstName: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate()

    const handleChange = (e) => {
        let {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, email, firstName, password} = formData
        setFormData(initialState)

        const resp = await axios.post(`${url}/user/register`, {
            username, email, firstName, password
        })
        navigate('/')
    }


    
    return (
        <form className="form d-flex" onSubmit={{handleSubmit}}>
            <div className="row my-2" id="usernameField">
                <div className="col">
                    <label htmlFor="username" className="mx-2">Username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                    />
                </div>
            </div>
            <div className="row my-2" id="emailField">
                <label htmlFor="email" className="mx-2">Email: </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />
            </div>
            <div className="row my-2" id="firstNameField">
                <label htmlFor="firstName" className="mx-2">First name: </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                />
            </div>
            <div className="row my-2" id="passwordField">
                <label htmlFor="username" className="mx-2">Username: </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                />
            </div>
        </form>
    )
}

export default RegisterForm