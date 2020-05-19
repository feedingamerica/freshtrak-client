import React from 'react';

const MemberInfoComponent = React.forwardRef((props, ref)=> {
    const [memberData,setMemberData] = React.useState(props.memberData);

React.useImperativeHandle(ref, () => ({
        getFamilyData(){

            return memberData
       }
        }));

 const buildMemberInfo = (event,currentIndex)=>{
     event.persist();

setMemberData(prevState => ({
  memberData: prevState.memberData.map(
    (member,index) =>  index === currentIndex? { ...member, [event.target.name] : event.target.value }: member
  )

}))


     }


    return (
            <div>
                {memberData.memberData.map((member, index) => {
                    return <div key={index}>{
                        <div>
                        
                            <div className="form-title">
                                 {member.id} Household Member
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" id={`first_name_${index}`} defaultValue={member.first_name} onChange={(e)=>buildMemberInfo(e,index)} name="first_name" />
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input type="text" className="form-control"
                                    name="middle_name" id="middle_name" defaultValue={member.middle_name} onChange={(e)=>buildMemberInfo(e,index)} name="middle_name" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" defaultValue={member.last_name} onChange={(e)=>buildMemberInfo(e,index)} name={"last_name"} />
                            </div>

                            <div className="form-group">
                                <label>Suffix</label>
                                <select className="form-control" id={`suffix_${index}`} defaultValue={member.suffix} onChange={(e)=>buildMemberInfo(e,index)}  name={"suffix"}  >

                                    <option>Jr</option>
                                    <option>Sr</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" className="form-control" id={`dob_${index}`} defaultValue={member.dob} onChange={(e)=>buildMemberInfo(e,index)} name={"dob"}  />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                 <select  onChange={(e)=>buildMemberInfo(e,index)} id={`gender_${index}`} defaultValue={member.gender} name={"gender"}  className="form-control"  >
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


export default MemberInfoComponent;
