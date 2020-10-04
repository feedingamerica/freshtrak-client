import React, { Fragment, useEffect, useState } from 'react';

const PhoneInputComponent = (props) => {
  const [phoneNo, setPhoneNo] = useState('');

  useEffect(()  => {
    setPhoneNo(normalizeInput(props.value));
  }, [props.value]);

  const normalizeInput = (value) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (value.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7)
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
        3,
        6
      )}-${currentValue.slice(6, 10)}`;
    } else {
      return value
    }
  };

  const formatPhone = (e) => {
    const value = e.target.value;
    const updatedPhone = normalizeInput(value);
    props.onChange(updatedPhone);
  };

  return (
    <Fragment>
      <input
        type="text"
        className={props.className}
        name={props.name}
        placeholder={props.placeholder}
        id={props.id}
        value={phoneNo}
        onChange={(e) => formatPhone(e)}
        ref={props.register({
          validate: value => value.length === 14
        })}
      />
    </Fragment>
  )
};

export default PhoneInputComponent;
