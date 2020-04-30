import React, { useState, useEffect } from 'react';
import MapImage from '../../Assets/img/map.jpg';
const MapContainer = props => {

    return(
        <div className="h-100">
            <img src={MapImage} className="img-fluid"/>
        </div>
    )
};

export default MapContainer;