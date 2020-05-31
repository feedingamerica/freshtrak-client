/**
 * Button Component - Can be used for back Navigation
 */
import React from 'react';
import backBtn from '../../Assets/img/back.svg';
import {useHistory} from 'react-router-dom';
const NavigationBtnComponent = () => {
  const history = useHistory();
  return (
    <button
      type="button"
      className="btn back-button"
      onClick={() => history.goBack()}
    >
      <span className="back-arrow">
        <img aria-hidden="true" alt="Go back" src={backBtn} />
      </span>
      <span className="font-weight-bold text-uppercase ml-2">Back</span>
    </button>
  )
};

export default NavigationBtnComponent;