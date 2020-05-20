
import React from 'react';
import ButtonComponent from '../../General/ButtonComponent'
const CheckboxQstnComponent = (props) => {
let {qstn} = props.content;
    return (
		<>
			<h2 style={{marginTop:'100px',wordBreak:'break-all'}}> {qstn} </h2>

		<div><input type="checkbox"  />Working for pay full-time   (30 hours per week or more)</div>
		<div><input type="checkbox"  />Working for pay part-time  (Less than 30 hours per week)</div> 
		<div><input type="checkbox"  />Pension</div>
		<div><input type="checkbox"  />Social Security</div>
		<div><input type="checkbox"  />Unemployment compensation</div>
		<div><input type="checkbox"  />Disability (SSDI), workman’s compensation, or Supplemental Security Income (SSI)</div>
		<div><input type="checkbox"  />General assistance</div>
		<div><input type="checkbox"  />Temporary Assistance to Needy Families also called TANF, formally AFDC</div>
		<div><input type="checkbox"  />Government assistance with child care costs</div>
		<div><input type="checkbox"  />Child support or alimony</div>

			
		</>
    )

};

export default CheckboxQstnComponent;
