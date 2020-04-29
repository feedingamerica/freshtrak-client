import React, {useEffect, useState} from 'react';
import { formatDateDayAndDate } from '../../Utils/DateFormat';
import '../../Assets/scss/main.scss';
import ButtonComponent from '../General/ButtonComponent';
import TimePicker from 'react-time-picker';
import 'react-clock/dist/Clock.css';

const TimeSlotDetailsComponent = (props) => {
    const [timeDetails, setTimeDetails] = useState([]);
    const [timeSlot, setTimeSlot] = React.useState("");
    const [minTime, setMinTime] = React.useState("");
    const [maxTime, setMaxTime] = React.useState("");

    useEffect(() => {
        if(props.eventDetails.startTime) {
            let start = convertTime12to24(props.eventDetails.startTime);
            let end = convertTime12to24(props.eventDetails.endTime);
            setMinTime(start);
            setMaxTime(end);
            setTimeSlot(start);
        }
    },[props.eventDetails.startTime]);

    const {
        eventDetails: {
            startTime,
            endTime,
            date,
            agencyName,
        },
    } = props;


    const convertTime12to24 = (time12h) => {

        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }


        if(typeof minutes == 'undefined'){
            minutes = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    };


    const saveTimeSlot = () => {
        console.log('redirect to register page');
    };

    const buildData = (e) => {
        console.log(e)
        setTimeSlot(e);
    };


    return (
        <div className="col-lg-4 col-xl-4">
            <div className="day-view-item">
                <div className="day-view-item-header">
                    <div className="day-view-header-title">{agencyName}</div>
                </div>
                <div className="day-view-item-details">
                    <div className="timings d-flex justify-content-between">
                        <div className="date-wrapper">{formatDateDayAndDate(date)}</div>
                        <div className="timing-wrapper">
                            {startTime} - {endTime}
                        </div>
                    </div>
                    <div className="address-wrap">
                        <p><b>Registration is required for this event</b></p>

                        <p>This resource event has multiple time slots available and allows you
                        to reserve a place with registration.</p>
                        <p> Please select a time slot to continue.</p>
                    </div>
                    <div className="react-time-picker">
                    <TimePicker format="hh:mm" hourAriaLabel="Hour" renderNumbers clockClassName="react-clock"
                                value={timeSlot} minTime={minTime} maxTime={maxTime} name="reserveTime"
                                onChange={buildData} />
                    </div>
                    <div className="day-view-item-detail-footer d-flex mt-3">
                        <ButtonComponent type ='button' name="saveTimeSlot" dataid= ''
                                         id="" value="Continue"
                                         className = 'btn custom-button time-slot-continue'
                                         onClickfunction={saveTimeSlot} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeSlotDetailsComponent;
