import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";


const Navbar = ({token, setToken}) => {
    const handleLogout = () => {
        console.log("removing auth...")
        console.log(token)
        setToken({})
        console.log(token)
    }
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
                    {!token ?
                    <div className="col-2 d-flex justify-content-between">
                        <NavLink className="link" to="/:username">
                            {token.username}
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