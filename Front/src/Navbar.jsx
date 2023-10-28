import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewEntryForm from "./NewEntryForm";
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import RegisterForm from "./RegisterForm";




const Navbar = ({username, token, setUsername, setToken}) => {
    const handleLogout = () => {
        setToken("")
        setUsername("")
    }

    return (

        <>
            <div className="row d-flex justify-content-between">
                <div className="col-2">
                    <div className="row">
                        <div className="col">
                            <NavLink className="link" to="/">
                                Carpe
                            </NavLink>
                        </div>
                        {token ?
                        <div className="col">
                            <NavLink className="link" to="/newEntry">
                                New Entry
                            </NavLink>
                        </div> :
                        <></>
                        }
                    </div>
                </div>
                {username !== "" ?
                <div className="col-2 d-flex justify-content-between">
                    <NavLink className="link" to={`/${username}`}>
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
            </div>
        </>
    )
}

export default Navbar