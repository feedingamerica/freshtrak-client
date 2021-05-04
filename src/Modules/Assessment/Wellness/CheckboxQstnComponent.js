
import React, { useContext, useEffect, useState } from 'react';
//import { event } from 'react-ga';
//import ButtonComponent from '../../General/ButtonComponent';
import WellnessContext from './WellnessContext';
const CheckboxQstnComponent = (props) => {
    let { question, assessment_qn_id, option, description,option_id,go_to_page,previous_page,
		next_page } = props.content;
    let context = useContext(WellnessContext);
    let childObj = {};
    const [checkedOptions, setCheckedOptions] = useState([])
    const [indexArray,setIndexArray] = useState([])

    useEffect(() => {
        setCheckedOptions(context.answers[assessment_qn_id-1])
        setIndexArray([])
        context.previous_page[assessment_qn_id-1] = previous_page-1;
        context.next_page[assessment_qn_id-1] = next_page-1;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.content.assessment_qn_id])

    const isChecked = (value,index) => {
        let valueArray = context.answers[assessment_qn_id-1];
        if(value && value !== undefined && valueArray && valueArray!== undefined && valueArray.length === 0){
            return false;  
        }else{
            if(value && value !== undefined && checkedOptions && checkedOptions.indexOf(value) > -1 && indexArray.indexOf(index) < 0){
                indexArray.push(index)
                setOptionArray()
            }
            if(checkedOptions) return (checkedOptions.indexOf(value) > -1)
        }

       
    }
    const setOptionArray = ()=>{
        let tempOptions = [];
        //indexArray.map((val,index)=>{
            indexArray.forEach((val,index)=>{
            if(tempOptions.indexOf(option_id[val]) === -1)
            {
                tempOptions.push(option_id[val])
            }
            else{
            }
            context.option_id[assessment_qn_id-1] = tempOptions;
            context.go_to_page[assessment_qn_id-1] = go_to_page[0] -1;
        })

    }

    const setChecked = (e) => {
        if (e.target.checked) {
            setCheckedOptions([...checkedOptions, e.target.value])
        } else {
            let delIndex = checkedOptions.indexOf(e.target.value)
            let ValueToDeleteFromOptionIndexArray = option.indexOf(e.target.value)
            let delIndexFromIndexArray = indexArray.indexOf(ValueToDeleteFromOptionIndexArray)
            indexArray.splice(delIndexFromIndexArray,1)
            setOptionArray()

            let newArray = [...checkedOptions]
            newArray.splice(delIndex,1)
            setCheckedOptions(newArray)
        }
    }


    const setValue = (e) => {
        setChecked(e)
        if (e && e.target && e.target.value !== null) {
            childObj[e.target.name] = e.target.value
        }

                if (context.answers[assessment_qn_id - 1].map((value, index) => {
                    return value;
                }).indexOf(e.target.value) === -1) {
                    context.answers[assessment_qn_id - 1].push(e.target.value)
                    //let answers = [...context.answers[assessment_qn_id - 1]]
                }
                else {
                    let delIndex = context.answers[assessment_qn_id - 1].map((value, index) => {
                        return value;
                    }).indexOf(e.target.value);
                    context.answers[assessment_qn_id - 1].splice(delIndex, 1)
                    setOptionArray()
                }

    }
    return (
        <React.Fragment>

            <div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                <div className="a-c-content flex-grow-1">
                    <span className="font-weight-bold">{question} </span>
                    <p className="mt-2">{description ? description : ""}</p>
                    <div className="mt-4 checkbox-wrapper">
                        {option.map((value, index) => {
                            return <div key={index} 
                            className="form-group">
                                <div className="checkbox-custom">
                                    <input type="checkbox"
                                        disabled={false}
                                        //id={index || ""}
                                        id={index}
                                        //value={value || ""}
                                        value={value || ""}
                                        checked={isChecked(value,index)}
                                        onChange={(e)=>setValue(e)}
                                        //name={index || ""} 
                                        name={index} 
                                        />
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
