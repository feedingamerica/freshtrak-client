import React, {useEffect} from 'react';
import { formatDateDayAndDate } from '../../Utils/DateFormat';
import '../../Assets/scss/main.scss';
import ButtonComponent from '../General/ButtonComponent';

const TimeSlotDetailsComponent = (props) => {

    useEffect(() => {
        console.log(props);
    },[]);

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
                    <div>
                        <select value="" className="dropdown-toggle btn btn-secondary" >
                            <option className="dropdown-item" value={11} >11:00</option>
                            {/*{roleValue.map( (value, index) => {*/}
                                {/*return <option className="dropdown-item" value={value.id} key={index}>{value.role_name}</option>*/}
                            {/*})  }*/}
                        </select>
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
