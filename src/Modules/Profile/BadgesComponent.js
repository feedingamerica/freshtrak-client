import React from 'react';
import pantryVisitorImage from '../../Assets/img/pantry-visitor.png';
import profileCompleterImage from '../../Assets/img/profile-completer.png';
import reservationImage from '../../Assets/img/reservation.png';
import taskManagerImage from '../../Assets/img/taskManager.png';
import volunteerImage from '../../Assets/img/volunteer.png';

const BadgesComponent = () =>{
  return (
    <div className="pt-50 pb-50">
       <h5 className="font-weight-bold">Badges</h5>
       <ul className="d-flex badges-list">
         <li>
           <div className="badge-icon">
             <img src={pantryVisitorImage}/>
           </div>
           <div>Pantry Visitor</div>
         </li>
         <li>
         <div className="badge-icon">
             <img src={reservationImage}/>
           </div>
           <div>Reservation Newbie</div>
         </li>
         <li>
         <div className="badge-icon">
             <img src={taskManagerImage}/>
           </div>
           <div>Task Manager</div>
         </li>
         <li>
         <div className="badge-icon">
             <img src={profileCompleterImage}/>
           </div>
           <div>Profile Completer</div>
         </li>
         <li>
         <div className="badge-icon">
             <img src={volunteerImage}/>
           </div>
           <div>Volunteer</div>
         </li>
       </ul>
    </div>
  )
}
export default BadgesComponent;