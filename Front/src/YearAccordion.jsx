import React, { useState } from "react"

const YearAccordion = ({entries, year}) => {
    const [months, setMonths] = useState([])
    const [monthMap, setMonthMap] = useState({})
    
    const monthNames = {
        "01": "January", "02": "February", '03': "March",
        "04": "April", "05": "May", "06": "June",
        "07": "July", '08': "August", "09": "September",
        '10': "October", "11": "November", "12": "December"
    }

    const makeMonthMap = (entries) => {
        return entries.map(e => {
            const month = e.entry_date.slice(5,7)
            const monthName = monthNames[month]

            if (!monthMap[monthName]) {
                monthMap[monthName] = e
            } else {
                monthMap[monthName] = [...monthMap[monthName], e]
            }
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (Object.keys(monthMap).length === 0) {
            const newMap = {}
            
            entries.forEach(e => {
                const month = e.entry_date.slice(5, 7)
                const monthName = monthNames[month]

                if (!newMap[monthName]) {
                    newMap[monthName] = e
                } else {
                    newMap[monthName] = {...newMap, e}
                }
            })
            setMonthMap(newMap)
        }
    }

    return (
        <>
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button onClick={handleClick} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        {year}
                        </button>
                    </h2>

                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        {Object.keys(monthMap).map(m => (
                            <h1>{m}</h1>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default YearAccordion