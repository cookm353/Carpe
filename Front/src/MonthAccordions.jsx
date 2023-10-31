import React, { useState } from "react";

const MonthAccordion = ({entries}) => {
    const monthMap = {
        1: "January", 2: "February", 3: "March",
        4: "April", 5: "May", 6: "June",
        7: "July", 8: "August", 9: "September",
        10: "October", 11: "November", 12: "December"
    }

    function getMonthName(date) {
        const month = date.slice(5, 7)
        return monthMap[month]
    }
    
    return (
        <>
        </>
    )
}

export default MonthAccordion