import React, { Fragment } from 'react';

const PhoneComponent = (props) => {
  const formatPhoneNumber = (input) => {
    const regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (input) {
      return input.replace(regExp, '($1) $2-$3');
    } else {
      return '';
    }
  };

  return (
    <Fragment>
      <input
        type="text"
        className={props.className}
        name={props.name}
        placeholder={props.placeholder}
        id={props.id}
        value={formatPhoneNumber(props.value)}
        onChange={(e)=>props.onChange(e)}
        ref={props.register({
          validate: value => value.length >= 14
        })}
      />
    </Fragment>
  )
};

export default PhoneComponent;
