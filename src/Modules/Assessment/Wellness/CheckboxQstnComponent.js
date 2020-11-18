
import React,{useContext,useState} from 'react';
import { event } from 'react-ga';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContext from './WellnessContext';
const CheckboxQstnComponent = (props) => {
let {question,id,option,description} = props.content;
let context = useContext(WellnessContext);
let childObj = {};

const setValue = (e) =>{
    if(e && e.target && e.target.value !== null){
        childObj[e.target.name]=e.target.value
    }
    console.log("e.target.name >>",e.target.name)
    console.log("e.target.value >>",e.target.value)
    Object.keys(context.answers).map((value,index)=>{
    if(value == id-1) {
        context.answers[value] = e.target.value;
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
                                    {option.map((value,index)=>{
                                       return <div key={index} className="form-group">
                                            <div className="checkbox-custom">
                                                <input type="checkbox" disabled={false} id={index} onClick={(e)=>setValue(e)} value={value} name={index}/>
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
