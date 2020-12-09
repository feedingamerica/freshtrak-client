
import React, { useContext, useEffect, useState } from 'react';
import { event } from 'react-ga';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContext from './WellnessContext';
const CheckboxQstnComponent = (props) => {
    let { question, id, option, description } = props.content;
    let context = useContext(WellnessContext);
    let childObj = {};
    const [checkedOptions, setCheckedOptions] = useState([])


    useEffect(() => {
        setCheckedOptions(context.answers[id-1])
    }, [props.content.option,props.content.id])

    const isChecked = (value) => {
        let valueArray = context.answers[id-1];
        if(valueArray.length == 0){
            return false;
        }else{
            return (checkedOptions.indexOf(value) > -1)
        }

       
    }

    const setChecked = (e) => {
        if (e.target.checked) {
            setCheckedOptions([...checkedOptions, e.target.value])
        } else {
            let delIndex = checkedOptions.indexOf(e.target.value)
            let newArray = [...checkedOptions]
            newArray.splice(delIndex,1)
            setCheckedOptions(newArray)
        }
    }


    const setValue = (e) => {
        setChecked(e) // just commented
        if (e && e.target && e.target.value !== null) {
            childObj[e.target.name] = e.target.value
        }
        Object.keys(context.answers).map((value, index) => {

            if (value == id - 1) {
                let val = value;
                if (Object.values(context.answers[id - 1]).map((value, index) => {
                    return value;
                }).indexOf(e.target.value) == -1) {
                    context.answers[value].push(e.target.value)
                    let answers = [...context.answers[value]]
                }
                else {
                    let delIndex = Object.values(context.answers[id - 1]).map((value, index) => {
                        return value;
                    }).indexOf(e.target.value);
                    context.answers[value].splice(delIndex, 1)
                }

            }
        });
    }
    return (
        <React.Fragment>

            <div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                <div className="a-c-content flex-grow-1">
                    <span className="font-weight-bold">{question} </span>
                    <p className="mt-2">{description}</p>
                    <div className="mt-4 checkbox-wrapper">
                        {option.map((value, index) => {
                            return <div key={index} className="form-group">
                                <div className="checkbox-custom">
                                    <input type="checkbox"
                                        disabled={false}
                                        id={index}
                                        value={value}
                                        checked={isChecked(value)}
                                        onChange={setValue}
                                        name={index} />
                                    <label htmlFor={index}>{value} </label>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
            </div>
        </React.Fragment>
    )

};

export default CheckboxQstnComponent;
