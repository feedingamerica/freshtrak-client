import React from 'react';

const MemberInfoComponent = React.forwardRef((props, ref)=> {
    const [memberCount,setMemberCount] = React.useState(JSON.parse(localStorage.getItem('memberCountData')));
    const juniorRef = React.useRef();
    const adultRef = React.useRef();
    const seniorRef = React.useRef();

React.useImperativeHandle(ref, () => ({
        buildFamilyData(){

            return {
                memberCountData:{
                    juniorData: juniorRef.current.getCurrentData(),
                    adultData: adultRef.current.getCurrentData(),
                    seniorData:seniorRef.current.getCurrentData() 
                }

       }
        }}));


    const JuniorMember = React.forwardRef((props, ref) => {
        let contentJunior = Array.from(Array(memberCount.memberCountData.countKids).keys());
        const [juniorData,setJuniorData] = React.useState({});
        const buildMemberInfo = (event,index)=>{
         setJuniorData({...juniorData,[index]:{...juniorData[index],[event.target.name] : event.target.value}});
     }

     React.useImperativeHandle(ref, () => ({
        getCurrentData(){
            return juniorData
        }}));

        return (
            <div>
                {contentJunior.map((value, index) => {
                    return <div key={index}>{
                        <div className="info-wraps" data-testid="member-form">
                            <div className="form-title">
                                Junior Household Member {index +1}
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" onChange={(e)=>buildMemberInfo(e,index)} className="form-control" name={"first_name_junior_" + value} id="first_name_junior_"
                                />
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input type="text" onChange={(e)=>buildMemberInfo(e,index)} className="form-control" name={"middle_name_junior_" + value}   id="middle_name_junior_" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" onChange={(e)=>buildMemberInfo(e,index)} className="form-control" name={"last_name_junior_" + value} id={"last_name_junior_" + value}
                                />
                                <div>
                                </div>

                            <div className="form-group" >
                                <label>Suffix</label>
                                <select  id={"suffix_junior"+value} onChange={(e)=>buildMemberInfo(e,index)} defaultValue="Jr" name={"suffix_junior_"+value} className="form-control"  >
                                    <option>Jr</option>
                                    <option>Sr</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" onChange={(e)=>buildMemberInfo(e,index)} className="form-control" name={"dob_junior_"+value} id={"dob_junior_"+value} />
                            </div>
                             <div className="form-group">
                                <label>Gender</label>
                                 <select  id={"gender_junior"+value} onChange={(e)=>buildMemberInfo(e,index)} defaultValue="Prefer Not to Specify" name={"gender_junior_"+value} className="form-control"  >
                                    <option>Prefer Not to Specify</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                             </div>
                        </div>
                        </div>
                    }</div>
                })}
            </div>
        )
    });
    const AdultMember =React.forwardRef((props, ref) => {

        let contentAdult = Array.from(Array(memberCount.memberCountData.countAdult).keys())
        const [adultData,setAdultData] = React.useState({});

        const buildMemberInfo = (event,index)=>{
            console.log(event,index)
         setAdultData({...adultData,[index]:{...adultData[index],[event.target.name] : event.target.value}});
     }


      React.useImperativeHandle(ref, () => ({
        getCurrentData(){
            return adultData
        }}));
        return (
            <div>
                {contentAdult.map((value, index) => {
                    return <div key={index}>{
                        <div>
                            <div className="form-title">
                                Adult Household Member {index +1}
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" onChange={(e)=>buildMemberInfo(e,index)} className="form-control" name={"first_name_adult_" + value} id={"first_name_adult_" + value} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input type="text" onChange={(e)=>buildMemberInfo(e,index)}  className="form-control"
                                    name="middle_name" id="middle_name" onChange={(e)=>buildMemberInfo(e,index)} name={"middle_name_adult_" + value} id={"middle_name_adult_" + value}/>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" onChange={(e)=>buildMemberInfo(e,index)} className="form-control" name={"last_name_adult_" + value} id={"last_name_adult_" + value} 
                                />
                            </div>

                            <div className="form-group">
                                <label>Suffix</label>
                                <select id={"suffix_adult" + value} onChange={(e)=>buildMemberInfo(e,index)} defaultValue="Jr" name={"suffix_adult_" + value} className="form-control"  >
                                    <option>Jr</option>
                                    <option>Sr</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" className="form-control" onChange={(e)=>buildMemberInfo(e,index)} name={"dob_adult_" + value} id={"dob_adult_" + value} />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                 <select  id={"gender_adult"+value}  onChange={(e)=>buildMemberInfo(e,index)} name={"gender_adult_"+value} defaultValue="Prefer Not to Specify" className="form-control"  >
                                    <option>Prefer Not to Specify</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                             </div>
                        </div>
                    }</div>
                })}
            </div>
        )
    });

    const SeniorMember = React.forwardRef((props, ref) => {

        let contentSenior = Array.from(Array(memberCount.memberCountData.countSenior).keys());
        const [seniorData,setSeniorData] = React.useState({});

        const buildMemberInfo = (event,index)=>{
         setSeniorData({...seniorData,[index]:{...seniorData[index],[event.target.name] : event.target.value}});
     }


      React.useImperativeHandle(ref, () => ({
        getCurrentData(){
            return seniorData
        }}));

        return (
            <div>
                {contentSenior.map((value, index) => {
                    return <div key={index}>{
                        <div>
                            <div className="form-title">
                                Senior Household Member {index+1}
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" onChange={(e)=>buildMemberInfo(e,index)} name={"first_name_senior_" + value} id={"first_name_senior_" + value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input type="text" className="form-control"
                                    name="middle_name" id="middle_name" onChange={(e)=>buildMemberInfo(e,index)} name={"middle_name_senior_" + value} id={"middle_name_senior_" + value}/>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" onChange={(e)=>buildMemberInfo(e,index)} name={"last_name_senior_" + value} id={"last_name_senior_" + value}
                                />
                            </div>

                            <div className="form-group">
                                <label>Suffix</label>
                                <select className="form-control" onChange={(e)=>buildMemberInfo(e,index)} defaultValue="Jr" name={"suffix_senior_" + value} id={"suffix_senior_" + value} >
                                    <option>Jr</option>
                                    <option>Sr</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" className="form-control" onChange={(e)=>buildMemberInfo(e,index)} name={"dob_senior_" + value} id={"dob_senior_" + value} />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                 <select  id={"gender_senior"+value} onChange={(e)=>buildMemberInfo(e,index)} name={"gender_senior_"+value} defaultValue="Prefer Not to Specify" className="form-control"  >
                                    <option>Prefer Not to Specify</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                             </div>
                        </div>

                    }</div>
                })}
            </div>
        )
    });

    return (
        <div>
            <JuniorMember ref={juniorRef} />
            <AdultMember ref = {adultRef}/>
            <SeniorMember ref = {seniorRef} />
        </div>
    )
});

export default MemberInfoComponent;
