/**
 * Button Component - Can be used for back Navigation
 */
import React from 'react';
import backBtn from '../../Assets/img/back.svg';
import {useHistory} from 'react-router-dom';
const NavigationBtnComponent = (props) => {
    let history = useHistory();
    return (
        <div className="back-button" onClick={()=>history.goBack()}>
            <span className="back-arrow">
                <img src={backBtn} />
            </span>
            <span className="font-weight-bold text-uppercase ml-2" >Back</span>
        </div>
    )
};

export default NavigationBtnComponent;