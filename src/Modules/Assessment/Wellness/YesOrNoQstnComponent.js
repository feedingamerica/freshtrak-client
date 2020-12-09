
import React,{useContext, useEffect,useState} from 'react';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContext from './WellnessContext';
const YesOrNoQstnComponent = (props) => {
let {question,id,go_to_page} = props.content;
let context = useContext(WellnessContext);
const [selected,setSelected] = useState(null); 
const setValue = (e) =>{
Object.keys(context.answers).map((value,index)=>{
    if(value == id-1) {
        context.answers[value] = e.target.value;
        console.log("value == id >>",value , id-1)
        console.log("context.answers[value] >>",context.answers[value])
        setSelected(e.target.value)
    }
    
});


}
useEffect(()=>{
    setSelected(context.answers[id-1])
    console.log("useEffect in YesOrNo",selected)
},[props.content.question,props.content.id])
    return (
		<>
                            <div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                                <div className="a-c-content flex-grow-1">
                                    <span className="font-weight-bold">{question}</span>
                                    <div className="radio-button-wrapper">
                                        <div className="form-group">
                                            <label htmlFor="yes" className="radio">
                                                <input onChange={setValue} type="radio" id="yes" name="yesorno" value="yes" checked={selected === "yes"}/>
                                                <span>Yes</span>
                                              </label>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="no" className="radio">
                                                <input onChange={setValue} type="radio" id="no" name="yesorno" value="no" checked={selected === "no"}/>
                                                <span>No</span>
                                              </label> 
                                        </div>
                                        
                                                                                   
                                    </div>
                                </div>
                            </div>				  
			
		</>
    )

};

export default YesOrNoQstnComponent;
