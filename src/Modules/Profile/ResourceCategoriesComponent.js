import React from 'react';
import foodImage from '../../Assets/img/food.png';
import healthImage from '../../Assets/img/health.png';
import educationImage from '../../Assets/img/education.png';
import economicImage from '../../Assets/img/economic.png';
import homeImage from '../../Assets/img/home.png';
import { Link } from 'react-router-dom';
import { RENDER_URL } from '../../Utils/Urls';

const ResourceCategoryComponent = () => {
  return (
    <>
    <h5 className="section-title font-weight-bold">Resource Categories</h5>
     <p>Description</p>
     <div className="row">
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img src={foodImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Food</div>
               <a href="" className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
             <img src={healthImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Health</div>
               {/* <a href={profileUrl} className="small">Take the Assessment</a> */}

               <Link to={RENDER_URL.WELLNESS_ASSESS_URL}>
               Take the Assessment
                </Link>



             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img src={healthImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Social & Community</div>
               <a href="" className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img src={educationImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Education</div>
               <a href="" className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img src={homeImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Neighborhood & Environment</div>
               <a href="" className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img src={economicImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Economic Stability</div>
               <a href="" className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
     </div>
    </>
  )
}
export default ResourceCategoryComponent;