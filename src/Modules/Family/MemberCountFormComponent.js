import React, { Fragment, forwardRef } from 'react';

const MemberCountFormComponent = forwardRef(({ register, event, watch, setValue }, ref) => {
  const countSenior = watch('seniors_in_household') || 0 ;
  const countAdult = watch('adults_in_household') || 0 ;
  const countKid = watch('children_in_household') || 0 ;

  const seniorDecrementFunction = e => {
    e.preventDefault();
    const newCount = countSenior - 1;
    if (newCount >= 0) {
      setValue('seniors_in_household', newCount);
    }
  };

  const seniorIncrementFunction = e => {
    e.preventDefault();
    setValue('seniors_in_household', Number(countSenior) + 1);
  };

  const adultDecrementFunction = e => {
    const newCount = countAdult - 1
    e.preventDefault();
    if (newCount >= 0) {
      setValue('adults_in_household', newCount);
    }
  };

  const adultIncrementFunction = e => {
    e.preventDefault();
    setValue('adults_in_household', Number(countAdult) + 1);
  };

  const kidDecrementFunction = e => {
    const newCount = countKid - 1
    e.preventDefault();
    if (newCount >= 0) {
      setValue('children_in_household', newCount);
    }
  };

  const kidIncrementFunction = e => {
    e.preventDefault();
    setValue('children_in_household', Number(countKid) + 1);
  };

  return (
    <Fragment>
      <div className="form-sub-title font-weight-bold mt-2">
        <h2>Tell us about your family</h2>
        How many additional family members are in each age group? (Do not include yourself)
        <div className="mt-3 pt-1">
          <div className="d-flex align-items-center pt-2 pb-2">
            <div className="member-age">Seniors ({event.seniorAge}+)</div>
            <div className="button-wrap d-flex flex-grow-1"></div>
            <button
              onClick={seniorDecrementFunction}
              data-testid="count_senior_dec"
              className="rounded-button"
              type="button"
            >
              <span className="sr-only">Decrease number of seniors</span>
              <span aria-hidden="true">-</span>
            </button>
            <label className="sr-only" htmlFor="seniors_in_household">Number of Seniors (60+)</label>
            <input
              type="text"
              className="number member-count"
              name="seniors_in_household"
              id="seniors_in_household"
              value={countSenior}
              onChange={() => {}}
              ref={register}
            ></input>
            <button
              onClick={seniorIncrementFunction}
              data-testid="count_senior_inc"
              className="rounded-button"
            >
              <span className="sr-only">Increase number of seniors</span>
              <span aria-hidden="true">+</span>
            </button>
          </div>

          <div className="d-flex align-items-center pt-2 pb-2">
              <div className="member-age">Adults ({event.adultAge}+)</div>
              <div className="button-wrap d-flex flex-grow-1"></div>
            <button
              onClick={adultDecrementFunction}
              data-testid="count_adult_dec"
              className="rounded-button"
              type="button"
            >
              <span className="sr-only">Decrease number of adults</span>
              <span aria-hidden="true">-</span>
            </button>
            <label className="sr-only" htmlFor="adults_in_household">Number of Adults ({event.adultAge}+)</label>
            <input
              type="text"
              className="number member-count"
              name="adults_in_household"
              id="adults_in_household"
              value={countAdult}
              onChange={() => {}}
              ref={register}
            ></input>
            <button
              onClick={adultIncrementFunction}
              data-testid="count_adult_inc"
              className="rounded-button"
            >
              <span className="sr-only">Increase number of Adults</span>
              <span aria-hidden="true">+</span>
            </button>
          </div>

          <div className="d-flex align-items-center pt-2 pb-2">
              <div className="member-age">Kids</div>
              <div className="button-wrap d-flex flex-grow-1"></div>
            <button
              onClick={kidDecrementFunction}
              data-testid="count_kid_dec"
              className="rounded-button"
              type="button"
            >
              <span className="sr-only">Decrease number of kids</span>
              <span aria-hidden="true">-</span>
            </button>
            <label className="sr-only" htmlFor="children_in_household">Number of Kids</label>
            <input
              type="text"
              className="number member-count"
              name="children_in_household"
              id="children_in_household"
              value={countKid}
              onChange={() => {}}
              ref={register}
            ></input>
            <button
              onClick={kidIncrementFunction}
              data-testid="count_kid_inc"
              className="rounded-button"
            >
              <span className="sr-only">Increase number of kids</span>
              <span aria-hidden="true">+</span>
            </button>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="license_plate">License Plate</label>
        <input
          type="text"
          className="form-control"
          name="license_plate"
          id="license_plate"
          ref={register}
        />
        <small>
          If you will arrive at the distribution in a vehicle and know the license plate, please include it here. Sharing your license plate enables expedited check-in at some distributions.
        </small>
      </div>
    </Fragment>
  );
});

export default MemberCountFormComponent;
