import React, { useState,useEffect } from 'react';
import TimeSlotDetailsComponent from './TimeSlotDetailsComponent';
import {withRouter} from 'react-router-dom';

const TimeSlotContainer = props => {
    const [eventDetails, setEventDetails] = useState({});
    
    useEffect(() => {
        let isEventData = !!props.location.state;        
        if (isEventData){
            setEventDetails(props.location.state.event);
        }
    },[]);

    return (
        <div>
            <section>
                <div className="container pt-100 pb-100">
                    <TimeSlotDetailsComponent eventDetails={eventDetails}/>
                </div>
            </section>
        </div>
    )

};

export default withRouter(TimeSlotContainer);
