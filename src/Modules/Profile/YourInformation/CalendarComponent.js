import React from 'react'
import { Calendar } from 'primereact/calendar';
const CalenderComponent = (props) => {
    return (
        <>
        <Calendar
            dateFormat={props.dateFormat ? props.dateFormat : "dd/mm/yy"}
            value={props.value}
            minDate={props.minDate}
            readOnlyInput={true}
            monthNavigator={props.monthNavigator}
            yearNavigator={props.yearNavigator}
            yearRange={`${new Date().getFullYear() - 130}:${new Date().getFullYear() + 1}`}
            onChange={(e) => props.onDateChange(e.value)}
            className={props.className ? props.className : ""}
            icon={props.icon ? props.icon : ""}
            showIcon={props.showIcon} />
            </>
    )
}
export default CalenderComponent