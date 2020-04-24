import React, { useState,useEffect } from 'react';
import TimeSlotDetailsComponent from './TimeSlotDetailsComponent';
import '../../Assets/scss/main.scss';
import {withRouter} from 'react-router-dom';

const TimeSlotContainer = props => {
    const [eventDetails, setEventDetails] = useState({});

    useEffect(() => {
        let isEventData = !!props.location.state;
        if (isEventData){
            setEventDetails(props.location.state.event);
        }
       console.log(props);

    },[]);




    return (
        <div>
            <section className="gray-bg">
                <div className="container pt-150 pb-150">
                    <TimeSlotDetailsComponent eventDetails={eventDetails}/>

                </div>
            </section>
        </div>
    )

};

export default withRouter(TimeSlotContainer);
