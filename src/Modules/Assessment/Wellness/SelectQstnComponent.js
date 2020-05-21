
import React,{useContext} from 'react';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContext from './WellnessContext';
const SelectQstnComponent = (props) => {
let {id,qstn,note,options} = props.content;
let context = useContext(WellnessContext);

const setValue = (e) =>{
Object.keys(context.answers).map((value,index)=>{
	if(value == id) context.answers[value] = e.target.value
})
}

    return (
		<>


<div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                                <div className="a-c-content flex-grow-1">
                                    <span className="font-weight-bold">{qstn}</span>
                                    <p className="mt-2">{note}</p>
                                    <div className="radio-button-wrapper">
                                    {
                                    	options.map((value,index)=>{
                                        return <div key={index} className="form-group">
                                            <label htmlFor={index} className="radio">
                                                <input type="radio" name="selection" onChange={setValue} value ={value} id={index} />
                                                <span>{value}</span>
                                              </label>
                                        </div>
        								})
                                    }	 
		
                                                                                   
                                    </div>
                                </div>
                            </div>
			
		</>
    );

};

export default SelectQstnComponent;
