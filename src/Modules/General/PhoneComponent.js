import React, { Fragment } from 'react';

const PhoneComponent = (props) => {
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

  // const formatPhone = (e) => {
  //   const value = e.target.value;
  //   const updatedPhone = normalizeInput(value);
  //   props.onChange(updatedPhone);
  // };

  const formatPhoneNumber = (input) => {
    const regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (input) {
      return input.replace(regExp, '($1) $2-$3');
    } else {
      return '';
    }
  };


//   const onPhoneChange = (e) => {
//     const number = e.target.value;
//     let phoneNumber = number.replace(/[^0-9]/ig, "");
//     if (phoneNumber.length > 10) {
//         phoneNumber = phoneNumber.substring(0, 10)
//         const num = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, phoneNumber.length)}`;
//         //setPhone(num)
//         console.log("num is>>",num)
//     }
//     else {
//       console.log("num in else is>>",e.target.value)
//         //setPhone(e.target.value)
//     }
// }

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
