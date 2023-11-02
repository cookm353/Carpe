import React, {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuidv4} from "uuid"

import url from "./Helpers";
import NewEntryForm from "./NewEntryForm";
import YearAccordion from "./YearAccordion";


const Entries = ({token, username}) => {
    const initialState = []
    
    const [entries, setEntries] = useState([])
    const [years, setYears] = useState(initialState)
    let entryMap = {}

    const monthMap = {
        "01": "January", '02': "February", "03": "March",
        "04": "April", "05": "May", "06": "June",
        "07": "July", "08": "August", "09": "September",
        "10": "October", "11": "November", "12": "December"
    }

    function makeEntryMap(entries) {
        const years = new Set()
        const months = new Set()
        const days = new Set()
        
        entries.forEach(e => {
            const year = e.entry_date.slice(0, 4)
            const month = e.entry_date.slice(5, 7)
            const monthName = monthMap[month]
            const day = e.entry_date.slice(8, 10)
            
            // If year isn't in object...
            if (!years.has(year)) {
                months.clear()
                years.add(year)
                entryMap[year] = {}
            }
        
            // If month isn't in that year's object...
            if (!months.has(monthName)) {
                days.clear()
                months.add(monthName)
                entryMap[year] = {...entryMap[year], [monthName]: {}}
            }
        
            if (!days.has(day)) {
                days.add(day)
                entryMap[year][monthName] = {...entryMap[year][monthName], [day]: [e]}
            }
        
        })
    }

    const handleGetEntries = async (e) => {
        e.preventDefault()
        const resp = await axios.get(`${url}/entry/${username}`, {
            headers: {
                Authorization: token
            }
        })
        const entryList = resp.data.entries
        setEntries(entryList)
        // makeEntryMap(entryList)
    }


    return (
        <>
            {entries.length !== 0 ? makeEntryMap(entries) : console.log("foo")}
            <div className="accordion-item" id="viewEntries">
                <h2 className="accordion-header">
                    <button 
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                        onClick={handleGetEntries}
                    >
                        View Entries
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        {Object.keys(entryMap).map(y => (
                            <YearAccordion entries={entryMap[y]} year={y} id={uuidv4()}/>
                        ))}
                    </div>
            </div>

            </div>
            <div className="accordion-item" id="addEntry">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                    >
                        Add Entry
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <NewEntryForm token={token} username={username}/>
                </div>
            </div>
        </>
    )
}

export default Entries