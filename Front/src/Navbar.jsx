import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";


const Navbar = ({username, setUsername, setToken}) => {
    const handleLogout = () => {
        console.log("removing auth...")
        console.log(username)
        setToken("")
        setUsername("")
        console.log(username)
    }

    console.log(username)
    return (

        <>
            <nav className="navbar d-flex">
                <div className="row">
                    <div className="col-2">
                        <NavLink className="link" to="/">
                            Carpe
                        </NavLink>
                    </div>
                    <div className="col-8" id="navbarSpacer"></div>
                </div>
                    {username !== "" ?
                    <div className="col-2 d-flex justify-content-between">
                        <NavLink className="link" to="/:username">
                            {username}
                        </NavLink>
                        <NavLink onClick={handleLogout} className="link" to="/">
                            Log out
                        </NavLink>
                    </div> :
                    <div className="col-2 d-flex justify-content-between">
                        <NavLink className="link" to="/register">
                            Register
                        </NavLink>
                        <NavLink className="link" to="/login">
                            Login
                        </NavLink>
                    </div>            
                    }
            </nav>
        </>
    )
}

export default Navbar