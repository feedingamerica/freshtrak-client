import { useState, useEffect } from "react";

const UseForm = (props, validations, callback, errorToComponent = false) => {
    const [errors, setErrors] = useState({});

    const formValidation = (value, validator, limit) => {
       
        let valueLength;
        if(typeof value === 'number') valueLength = value;
        else valueLength = value.length;
        switch (validator) {
            case "required":
                return valueLength > 0 ? "" : "This field is required";
            case "min":
                return valueLength >= limit
                    ? ""
                    : `This value needs to be at least ${limit} characters`;
            case "max":
                return valueLength <= limit
                    ? ""
                    : `This value cannot be more than ${limit} characters`;
            case "is_address":
                const validAddress = new RegExp("^[-().,#\/a-zA-Z0-9 ]*$");
                let errors_address = validAddress.test(value);
                return !errors_address
                    ? ""
                    : `Enter a valid address`;
            case "is_phone":
                // Validating phone number based on length
                return value.length>=9
                    ? ""
                    : `Enter a valid phone number`;
                            
            default:
                return "";
        }
    };

    /**
     * 
     * @param {object} e
     * if condition triggers when submit btn is clicked.
     * else condition triggers onBlur. 
     */
    const handleErrors = (e) => {
        if (typeof e.target === 'undefined') {
            let data = e;
            let loopFinish = '';
            for(let key in data){
                if(key in validations) loopFinish = processValidations(data[key], validations[key], key, true);    
            }
            return loopFinish;
        }else{
            let {name, value} = e.target;
            if(name in validations) processValidations(value, validations[name], name);
          
        }

    };

/**
 * 
 * @param {string} value 
 * @param {string} validate 
 * @param {string} name 
 * @param {boolean} lastLoop 
 */
    const processValidations = (value, validate, name, lastLoop) => {
        let validationRes;
        let validator;
        let limit;
        let count = 0;
        for (let i = 0; i < validate.length; i++) {
            count++;
            let splitKey = validate[i].split(':');
            if(typeof splitKey[1] !== 'undefined'){
                validator = splitKey[0];
                limit = splitKey[1];
            }else{
                validator = validate[i];
            }

            if (typeof validator === "string") {
                validationRes = formValidation(value, validator, limit);
            }
            if (validationRes) break;
        }

        // appending errors to the list
        setErrors(errors => ({
            ...errors,
            [name]: validationRes
        }));

        if(count >= 1 && lastLoop){
            if(validationRes){
                return true;
            }
            return false;
        }
    };

    useEffect(() => {
        for(let keys in errors){
            if(errors[keys] === null || errors[keys] === ""){
                delete errors[keys]
            }
        }
        if(Object.keys(errors).length === 0){
            callback();
        }
        if(!errorToComponent){
            props.onFormErrors(errors);
        }


    }, [errors]);



    return {
        handleErrors,
        errors
    };
};

export default UseForm;
