import React, {useEffect, useState} from 'react';
import { formatDateDayAndDate } from '../../Utils/DateFormat';
import '../../Assets/scss/main.scss';
import ButtonComponent from '../General/ButtonComponent';
import TimePicker from 'react-bootstrap-time-picker';

const TimeSlotDetailsComponent = (props) => {
    const [timeDetails, setTimeDetails] = useState([]);
    const [timeSlot, setTimeSlot] = React.useState("");
    const [minTime, setMinTime] = React.useState("");
    const [maxTime, setMaxTime] = React.useState("");

    const {
        eventDetails: {
            startTime,
            endTime,
            date,
            agencyName,
        },
    } = props;


    const saveTimeSlot = () => {
        console.log('redirect to register page');
    };

    const buildData = (e) => {
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
                        <TimePicker value={timeSlot} start={startTime} end={endTime} step={30} name="reserveTime" onChange={buildData} />

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
