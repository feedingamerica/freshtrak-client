
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
                            <div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                                <div className="a-c-content flex-grow-1">
                                    <span className="font-weight-bold">{qstn}</span>
                                    <div className="radio-button-wrapper">
                                        <div className="form-group">
                                            <label htmlFor="yes" className="radio">
                                                <input onChange={setValue} type="radio" id="yes" name="yesorno" value="yes" />
                                                <span>Yes</span>
                                              </label>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="no" className="radio">
                                                <input onChange={setValue} type="radio" id="no" name="yesorno" value="no" />
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
