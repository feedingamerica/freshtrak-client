
import React,{useContext} from 'react';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContext from './WellnessContext';
const YesOrNoQstnComponent = (props) => {
let {qstn,id,goToId} = props.content;
let context = useContext(WellnessContext);

const setValue = (e) =>{
Object.keys(context.answers).map((value,index)=>{
	if(value == id) context.answers[value] = e.target.value
});


}
    return (
		<>
			<h2 style={{marginTop:'100px',wordBreak:'break-all'}}> {id} - {qstn} </h2>
			
				  <input onChange={setValue} type="radio" id="yes" name="yesorno" value="yes" />
				  <label htmlFor="yes">Yes</label>
				  <input onChange={setValue} type="radio" id="no" name="yesorno" value="no" />
				  <label htmlFor="no">No</label>
			
		</>
    )

};

export default YesOrNoQstnComponent;
