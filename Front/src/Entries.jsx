import React, {useState, useEffect} from "react";
import axios from "axios";

import url from "./Helpers";
import NewEntryForm from "./NewEntryForm";
import YearAccordion from "./YearAccordion";


const Entries = ({token, username}) => {
    const initialState = []
    
    const [entries, setEntries] = useState([])
    const [years, setYears] = useState(initialState)
    let yearMap = {}

    const monthMap = {
        1: "January", 2: "February", 3: "March",
        4: "April", 5: "May", 6: "June",
        7: "July", 8: "August", 9: "September",
        10: "October", 11: "November", 12: "December"
    }

    function makeYearMap (entries) {
        return entries.map(entry => {
            const year = entry.entry_date.slice(0, 4)
            
            if (!yearMap[year]) {
                yearMap[year] = [entry]
            } else {
                yearMap[year] = [...yearMap[year], entry]
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
        makeYearMap(entryList)
    }

    

    return (
        <>
            {entries.length !== 0 ? makeYearMap(entries) : console.log("foo")}
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
                        {Object.keys(yearMap).map(y => (
                            <YearAccordion entries={yearMap[y]} year={y}/>
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