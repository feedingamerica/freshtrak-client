import React, {useEffect, useState} from 'react';
import { formatDateDayAndDate } from '../../Utils/DateFormat';
import ButtonComponent from '../General/ButtonComponent';
import TimePicker from 'react-bootstrap-time-picker';
import NavigationBtnComponent from "../General/NavigationBtnComponent";
import { useHistory } from "react-router-dom";

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
    
    let history = useHistory();

    const saveTimeSlot = () => { 
        /*Here we need to add the save functionaly then redirct to registration page*/   
        //history.push('/family/create');        
    };

    const buildData = (e) => {
        setTimeSlot(e);
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12">                   
                    <NavigationBtnComponent />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12">
                    <div className="day-view-item">
                        <div className="day-view-item-header">
                            <div className="day-view-header-title">{agencyName}</div>
                        </div>
                        <div className="day-view-item-details">
                            <div className="timings d-flex">
                                <div className="date-wrapper">{formatDateDayAndDate(date)}</div>
                                <div className="timing-wrapper ml-2">
                                    {startTime} - {endTime}
                                </div>
                            </div>
                            <div className="address-wrap mt-2">
                                <span className="font-weight-bold color-red">Registration is required for this event</span>

                                <p className="mt-1">This resource event has multiple time slots available and allows you
                                to reserve a place with registration.</p>
                            </div>
                            <div className="row">
                                <div className="col-xl-4 col-lg-6 col-12">
                                    <div className="react-time-picker form-group">
                                    <label>Please select a time slot to continue.</label>
                                        <TimePicker value={timeSlot} start={startTime} end={endTime} step={30} name="reserveTime" onChange={buildData} />
                                    </div>
                                </div>
                            </div>
                            <div className="day-view-item-detail-footer d-flex mt-2">
                                <ButtonComponent type ='button' name="saveTimeSlot" dataid= ''
                                    id="" value="Continue"
                                    className = 'btn custom-button time-slot-continue'
                                    onClickfunction={saveTimeSlot} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeSlotDetailsComponent;
