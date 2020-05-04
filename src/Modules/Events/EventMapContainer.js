import React, { useEffect } from 'react';
import EventContainer from './EventContainer';
import MapContainer  from './MapContainer';

const EventMapContainer = props => {
    let isSearchData = !!props.location.state;
    useEffect(() => {
        if (isSearchData){
            props.history.replace({ state: null });
        }
    }, []);

    return(
        <div className="d-flex h-100">
            <div className="left-box">
                <div className="search-area-left-block-contents h-100">

                    {/* tried {...props} */}
                    <EventContainer {...props} />
                </div>
            </div>

            <div className="map-container flex-grow-1">
                <MapContainer/>
            </div>
        </div>

    )
};

export default EventMapContainer;