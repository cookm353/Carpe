import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import RegisterForm from "./RegisterForm";


const Navbar = ({username, setUsername, setToken}) => {
    const handleLogout = () => {
        setToken("")
        setUsername("")
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
                    {username !== "" ?
                    <div className="col-2 d-flex justify-content-between">
                        <NavLink className="link" to="/:username">
                            <FontAwesomeIcon icon="faUser" />
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