
import React,{useContext,useState} from 'react';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContext from './WellnessContext';
const CheckboxQstnComponent = (props) => {
let {qstn,id,options} = props.content;
let context = useContext(WellnessContext);
let childObj = {};
const setValue = (e) =>{

childObj[e.target.name]=e.target.value


Object.keys(context.answers).map((value,index)=>{
    if(value == id) context.answers[value] = childObj
});
}
    return (
		<React.Fragment>

                            <div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                                <div className="a-c-content flex-grow-1">
                                    <span className="font-weight-bold">{qstn} </span>
                                    <p className="mt-2">You can choose more than one.</p>
                                    <div className="mt-4 checkbox-wrapper">
                                    {options.map((value,index)=>{
                                       return <div key={index} className="form-group">
                                            <div className="checkbox-custom">
                                                <input type="checkbox" disabled={false} id={index} onClick={setValue} value={value} name={index}/>
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
