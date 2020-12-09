
import React,{useContext,useEffect,useState} from 'react';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContext from './WellnessContext';
const SelectQstnComponent = (props) => {
let {id,question,description,option} = props.content;
let context = useContext(WellnessContext);
const [selected,setSelected] = useState(null); 

const setValue = (e) =>{
Object.keys(context.answers).map((value,index)=>{
    if(value == id-1) context.answers[value] = e.target.value
    setSelected(e.target.value)
   // console.log("context.answers[value] >>",context.answers[value])
});
}

useEffect(()=>{
    setSelected(context.answers[id-1])
    //console.log("useEffect in YesOrNo",selected)
},[props.content.question,props.content.id,props.content.option])

    return (
		<>


<div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                                <div className="a-c-content flex-grow-1">
                                    <span className="font-weight-bold">{question}</span>
                                    <p className="mt-2">{description}</p>
                                    <div className="radio-button-wrapper">
                                    {
                                    	option.map((value,index)=>{
                                        return <div key={index} className="form-group">
                                            <label htmlFor={index} className="radio">
                                                <input type="radio" name="selection" onChange={setValue} value ={value} id={index} checked={selected === value}/>
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
