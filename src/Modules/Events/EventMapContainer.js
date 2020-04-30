import React, { useState, useEffect } from 'react';
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
                    <EventContainer location={props.location} />
                </div>
            </div>

            <div className="map-container flex-grow-1">
                <MapContainer/>
            </div>
        </div>

    )
};

export default EventMapContainer;