import React from 'react';
import { useParams } from 'react-router-dom';

const AgencyEventListContainer = props => {
  const { agencyId } = useParams();
  return <div>Agency Event List Container {agencyId}</div>;
};

export default AgencyEventListContainer;
