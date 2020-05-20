
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
console.log(context.answers)
}

    return (
		<>
			<h2 style={{marginTop:'100px',wordBreak:'break-all'}}> {qstn} </h2>

		{options.map((value,index)=>{

			return <div key={index}><label htmlFor={index}>{value}</label><input  type="radio" name="selection" onChange={setValue} value ={value} id={index} /> </div>
		})}	
		


			
		</>
    )

};

export default SelectQstnComponent;
