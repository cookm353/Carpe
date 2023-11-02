import React, { useState } from "react"
import {v4 as uuidv4} from "uuid"
import MonthAccordion from "./MonthAccordions"

const YearAccordion = ({entries, year, id}) => {
    const [months, setMonths] = useState([])
    const [monthMap, setMonthMap] = useState({})
    const targetId = `#${id}`
    // const monthId = uuidv4()

    const handleClick = (e) => {
        e.preventDefault()
        // if (Object.keys(monthMap).length === 0) {
        //     const newMap = {}
            
        //     entries.forEach(e => {
        //         const month = e.entry_date.slice(5, 7)
        //         const monthName = monthNames[month]

        //         if (!newMap[monthName]) {
        //             newMap[monthName] = e
        //         } else {
        //             newMap[monthName] = {...newMap, e}
        //         }
        //     })
        //     setMonthMap(newMap)
        // }
    }
    console.log(entries)

    return (
        <>
            {Object.keys(entries).map(e  => {
                console.log(e)
                console.log(entries[e])
            })}
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button onClick={handleClick} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={targetId} aria-expanded="false" aria-controls={id}>
                        {year}
                        </button>
                    </h2>

                    {/* <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample"> */}
                    <div id={id} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        {Object.keys(entries).map(m => {
                            const monthId = `${m}${year}`
                            return <MonthAccordion month={m} entries={entries[m]} id={monthId}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default YearAccordion