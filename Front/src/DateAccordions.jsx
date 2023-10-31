import React, {useState, useEffect} from "react";
import axios from "axios";

import url from "./Helpers";
import YearAccordion from "./YearAccordion";

const DateAccordion = ({token, username}) => {
    const initialState = []
    
    const [entries, setEntries] = useState(initialState)
    const [years, setYears] = useState(initialState)
    const yearMap = {}

    const monthMap = {
        1: "January", 2: "February", 3: "March",
        4: "April", 5: "May", 6: "June",
        7: "July", 8: "August", 9: "September",
        10: "October", 11: "November", 12: "December"
    }

    useEffect(() => {
        // Retrieve entries, add them to array of entries
        async function getEntries() {
            const resp = await axios.get(`${url}/entry/${username}`, {
                headers: {
                    Authorization: token
                }
            })
            const entryList = resp.data.entries
            setEntries(entryList)
        }

        // Build POJO {year1: [entry1, ...], year2: [entry1, ...], ...}
        async function makeYearMap () {
            entries.map(entry => {
                const year = entry.entry_date.slice(0, 4)
                
                if (!yearMap[year]) {
                    yearMap[year] = [entry]
                } else {
                    yearMap[year] = [...yearMap[year], entry]
                }
                setYears([...years, year])
            })
            console.log(yearMap)
            console.log(yearMap["2023"])
        }
        
        // Only invoke if a JWT is being stored in state
        if (token !== "") {
            getEntries()
            makeYearMap()
        }
        console.log("Token:\n", token)
        console.log("Entries:\n", entries)
        console.log("Year map:\n", yearMap)
        console.log("Years", years)

        Object.keys(yearMap).forEach(y => console.log("Year:", y))
        
        
    }, [token, username])

    return (
        <>
            {Object.keys(yearMap).length === 0 ?
                <h1>Bupkes</h1> :
                <h1>{Object.keys(yearMap)[0]}</h1>
            }

            {/* {Object.keys(yearMap).map(y => (
                    <YearAccordion
                        year={y}
                        entries={entries[y]}
                    />
            ))} */}

            {/* {years.forEach(year => {(
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        {year}
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                )
            })} */}
            {/* <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {2023}
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
            </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Accordion Item #2
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Accordion Item #3
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default DateAccordion