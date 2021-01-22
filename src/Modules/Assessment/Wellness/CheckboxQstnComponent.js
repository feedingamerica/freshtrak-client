
import React, { useContext, useEffect, useState } from 'react';
import { event } from 'react-ga';
import ButtonComponent from '../../General/ButtonComponent';
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
        // console.log("context.answers >>",context.answers)
        // console.log("[assessment_qn_id-1] >>",assessment_qn_id-1)
        setIndexArray([])
        context.previous_page[assessment_qn_id-1] = previous_page-1;
        context.next_page[assessment_qn_id-1] = next_page-1;
		//console.log("next_page in checkbox cmpnt set to >>",context.next_page[assessment_qn_id-1])
        //console.log("prev_page in checkbox cmpnt set to >>",context.previous_page[assessment_qn_id-1])
    }, [props.content.assessment_qn_id])

    const isChecked = (value,index) => {
                //console.log("checkedOptions >>",checkedOptions)
        let valueArray = context.answers[assessment_qn_id-1];
        //console.log("valueArray >>",valueArray)
        if(valueArray && valueArray!== undefined && valueArray.length == 0){
            return false;  
        }else{
            //new lines added
                        //console.log("checkedOptions in else >>",checkedOptions)
            //let temp = checkedOptions;
            if(checkedOptions.indexOf(value) > -1 && indexArray.indexOf(index) < 0){
                indexArray.push(index)
                        //console.log("checkedOptions inside else is >>",checkedOptions)
                setOptionArray()
            }
            //
            return (checkedOptions.indexOf(value) > -1)
        }

       
    }
    const setOptionArray = ()=>{
        //console.log("indexArray is >>",indexArray)
        //console.log("go_to_page[0] in checkbox is >>",go_to_page[0])
        //console.log("assessment_qn_id -1 is >>",assessment_qn_id -1)
        let tempOptions = [];
        //console.log("tempOptions is >>",tempOptions)
        indexArray.map((val,index)=>{
            //console.log("value is >>",val)
            //console.log("array we need >>",option_id[val])
            if(tempOptions.indexOf(option_id[val]) == -1)
            {
                tempOptions.push(option_id[val])
                //console.log("pushed ",option_id[val])
            }
            else{
                //console.log("already exists")
            }
            context.option_id[assessment_qn_id-1] = tempOptions;
            context.go_to_page[assessment_qn_id-1] = go_to_page[0] -1;
            //console.log("go_to_page set IN CHECKBOX >>",context.go_to_page[assessment_qn_id-1])
        })

    }

    const setChecked = (e) => {
        if (e.target.checked) {
            setCheckedOptions([...checkedOptions, e.target.value])
        } else {
            let delIndex = checkedOptions.indexOf(e.target.value)
            //new lines added
            let ValueToDeleteFromOptionIndexArray = option.indexOf(e.target.value)
            let delIndexFromIndexArray = indexArray.indexOf(ValueToDeleteFromOptionIndexArray)
            indexArray.splice(delIndexFromIndexArray,1)
            setOptionArray()
            //

            let newArray = [...checkedOptions]
            newArray.splice(delIndex,1)
            setCheckedOptions(newArray)
            //console.log("in setChecked - else - indexArray is>>",indexArray)
        }
    }


    const setValue = (e) => {
        setChecked(e) // just commented
        if (e && e.target && e.target.value !== null) {
            childObj[e.target.name] = e.target.value
        }
        // Object.keys(context.answers).map((value,index) => {

        //     if (value == assessment_qn_id - 1) {
        //         let val = value;
        //         if (Object.values(context.answers[assessment_qn_id - 1]).map((value, index) => {
        //             return value;
        //         }).indexOf(e.target.value) == -1) {
        //             context.answers[value].push(e.target.value)
        //             let answers = [...context.answers[value]]
        //         }
        //         else {
        //             let delIndex = Object.values(context.answers[assessment_qn_id - 1]).map((value, index) => {
        //                 return value;
        //             }).indexOf(e.target.value);
        //             context.answers[value].splice(delIndex, 1)
        //             setOptionArray()
        //         }

        //     }
        // });

        //Object.keys(context.answers).map((value,index) => {

            //if (value == assessment_qn_id - 1) {
                //let val = value;
                if (context.answers[assessment_qn_id - 1].map((value, index) => {
                    return value;
                }).indexOf(e.target.value) == -1) {
                    context.answers[assessment_qn_id - 1].push(e.target.value)
                    let answers = [...context.answers[assessment_qn_id - 1]]
                }
                else {
                    let delIndex = context.answers[assessment_qn_id - 1].map((value, index) => {
                        return value;
                    }).indexOf(e.target.value);
                    context.answers[assessment_qn_id - 1].splice(delIndex, 1)
                    setOptionArray()
                }

            //}
        //});
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
                                        checked={isChecked(value,index)}
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
