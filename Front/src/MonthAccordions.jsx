import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid'
import axios from "axios";
import url from "./Helpers"

const MonthAccordion = ({month, entries}) => {
    /*
    Go through each entry
    Create new sub-accordion for each entry's day
    Each one will open the entry for that given day
    */

    const months = {
        "January": 1, "February": 2, "March": 3,
        "April": 4, "May": 5, "June": 6,
        "July": 7, "August": 8, "September": 9,
        "October": 10, "November": 11, "December": 12
    }
    const handleClick = async () => {
        console.log("get years")
        // const resp = await axios.get(`${url}/entry/alice/years`)
        // console.log(resp.data)
    }

    
    return (
        <>
            {!entries ? console.log("foo") : 
                Object.keys(entries).map(e => {
                    // console.log(entries[e].entry_date)
                })
            }

            <div className="accordion accordion-flush" id="accordionFlushExample">
            
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button onClick={handleClick} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        {month}
                        </button>
                    </h2>

                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        foo
                    </div>
                </div>
            </div>
        </>
    )
}

export default MonthAccordion