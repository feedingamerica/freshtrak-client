import React from 'react';
import ResourceCategoryComponent from '../../Modules/Profile/ResourceCategoriesComponent';
import BadgesComponent from '../../Modules/Profile/BadgesComponent';
import YourReservationsComponent from '../../Modules/Profile/YourReservationsComponent';


const SummaryTabComponent = () => {
  
  return(
    <div className="container pt-3 pb-3">
      <ResourceCategoryComponent/>
      <BadgesComponent/>
      <YourReservationsComponent/>
    </div>
  )
}
export default SummaryTabComponent