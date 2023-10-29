import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import url from "./Helpers"
import "./NewEntryForm.css"


const NewEntryForm = ({ token, username }) => {
    const d = new Date()
    const today = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`
    const navigate = useNavigate()

    const initialState = {
        tookAmMeds: "yes",
        tookPmMeds: "yes",
        stressLevel: 5,
        activityLevel: 5,
        sleepQuality: 5,
        numDrinks: 0,
        numAuras: 0,
        numSeizures: 0,
        comment: "",
        entryDate: today
    }

    const[formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
            const resp = await axios.post(`${url}/entry/${username}`, formData, {
            headers: {
                'Authorization': token
            }
        })

        setFormData(initialState)
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit} className="form container" id="newEntryForm">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 d-flex justify-content-around">
                    <div className="">
                        <div className="form-check mb-2 d-flex row" id="amMeds">
                            <div className="row">
                                <p>Took morning medications</p>
                                <div id="didTakeAm" className="col">
                                    <input 
                                        name="tookAmMeds"
                                        id="didTakeAmMeds"
                                        value="yes"
                                        type="radio"
                                        // className="form-check-input"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="didTakeAmMeds" className="form-check-label">Yes</label>
                                </div>
                                <div id="didn'tTakeAm" className="col">
                                    <input 
                                        name="tookAmMeds"
                                        id="didn'tTakeAmMeds"
                                        value="no"
                                        type="radio"
                                        // className="form-check-input"
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="didn'tTakeAmMeds"
                                        className="form-check-label">
                                            No
                                    </label>
                                </div>
                                <div id="don'tTakeAm" className="col">
                                    <input 
                                        name="tookAmMeds"
                                        id="don'tTakeAmMeds"
                                        value="n/a"
                                        type="radio"
                                        // className="form-check-input"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="don'tTakeAmMeds" className="form-check-label">N/A</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-check mb-2 d-flex row" id="pmMeds">
                            <div className="row">
                                <p>Took evening medications</p>
                                <div className="col">
                                    <input 
                                        name="tookPmMeds"
                                        id="didTakePmMeds"
                                        value={"yes"}
                                        type="radio"
                                        // className="form-check-input"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="didTakePmMeds" className="form-label">Yes</label>
                                </div>
                                <div className="col">
                                    <input 
                                        name="tookPmMeds"
                                        id="didn'tTakePmMeds"
                                        value={"no"}
                                        type="radio"
                                        // className="form-check-input"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="didn'tTakePmMeds" className="form-label">No</label>
                                </div>
                                <div className="col">
                                    <input 
                                        name="tookPmMeds"
                                        id="don'tTakePmMeds"
                                        value={"n/a"}
                                        type="radio"
                                        // className="form-check-input"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="don'tTakePmMeds" className="form-label">N/A</label><br/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-2"></div>
            </div>

            <div id="stress">
                <label htmlFor="stressLevel" className="form-label">Stress level: {formData.stressLevel}</label>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4 d-flex justify-content-center">
                        <input
                            name="stressLevel"
                            id="stressLevel"
                            min="0"
                            max="10"
                            type="range"
                            className="form-range"
                            onChange={handleChange}
                            /><br/>

                    </div>
                    <div className="col-4"></div>
                </div>
            </div>

            <div id="activity">
                <div className="row">
                    <label htmlFor="activityLevel" className="form-label">Activity level: {formData.activityLevel}</label>
                    <div className="col-4"/>
                    <div className="col-4 d-flex justify-content-center">
                    <input
                        name="activityLevel"
                        id="activityLevel"
                        min="0"
                        max="10"
                        type="range"
                        className="form-range"
                        onChange={handleChange}
                        /><br/>
                    </div>
                    <div className="col-4"/>
                </div>
            </div>

            <div id="sleep">
                <label htmlFor="sleepQuality" className="form-label">Sleep quality: {formData.sleepQuality}</label>
                <div className="row">
                    <div className="col-4"/>
                    <div className="col-4 d-flex justify-content-center">
                        <input
                            name="sleepQuality"
                            id="sleepQuality"
                            min="0"
                            max="10"
                            type="range"
                            className="form-range"
                            onChange={handleChange}
                        /><br/>

                    </div>
                    <div className="col-4"/>
                </div>

            </div>

            <div id="drinks">
                <div className="row">
                    <div className="col-4"/>
                    <div className="col-2">
                        <label htmlFor="numDrinks" className="form-label">
                            Number of drinks: 
                        </label>
                    </div>
                    <div className="col-2">
                        <input
                            name="numDrinks"
                            id="numDrinks"
                            type="number"
                            onChange={handleChange}
                        /><br/>
                    </div>
                    <div className="col-4"/>
                </div>
            </div>

            <div id="auras">

            </div>
            <label htmlFor="numAuras" className="form-label">Number of auras: </label>
            <input
                id="numAuras"
                name="numAuras"
                type="number"
                onChange={handleChange}
            /><br/>

            <div id="seizures">

            </div>
            <label htmlFor="numSeizures" className="form-label">Number of seizures: </label>
            <input
                id="numSeizures"
                name="numSeizures"
                type="number"
                onChange={handleChange}
            /><br/>

            <div id="comments">

            </div>
            <label htmlFor="comment" className="form-label">Comments: </label>
            <input
                id="comment"
                name="comment"
                type="text"
                onChange={handleChange}
            /><br/>

            <div id="date">

            </div>
            <label htmlFor="entryDate" className="form-label">Entry date:</label>
            <input
                type="date"
                id="entryDate"
                name="entryDate"
                onChange={handleChange}
            /><br/>
            <button className="btn btn-primary">Submit</button>
        </form>
    )
}

export default NewEntryForm