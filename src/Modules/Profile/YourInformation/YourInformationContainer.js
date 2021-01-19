import React from 'react';
import AddressComponent from './AddressComponent';
import ContactComponent from './ContactComponent';
import InformationComponent from './InformationComponent';
import LanguagePreferenceComponent from './LanguagePreferenceComponent';
import VehiclesComponent from './VehiclesComponent';

const YourInformationContainer = () =>{
  return(
    <div className="d-flex flex-column">
      <InformationComponent/>
      <AddressComponent/>
      <ContactComponent/>
      <LanguagePreferenceComponent/>
      <VehiclesComponent/>
    </div>
  )
}
export default YourInformationContainer;