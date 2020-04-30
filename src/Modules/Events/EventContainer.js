
import React, { useState,useEffect } from 'react';
import SearchComponent from '../General/SearchComponent';
import ResourceListComponent from './ResourceListComponent';
import EventListContainer from './EventListContainer';
import { ProgressBar } from 'react-bootstrap';
import {API_URL} from '../../Utils/Urls';
import axios from 'axios';
import '../../Assets/scss/main.scss';
import MapImage from '../../Assets/img/map.jpg';
import Close from '../../Assets/img/add.svg';

const EventContainer = props => {
    const [foodBankResponse, setFoodBankResponse] = useState(false);
    let [foodBankData,setFoodBankData] = useState({});
    let [searchDetails,setSearchDetails] = useState({});
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        let isSearchData = !!props.location.state;
        if (isSearchData){
            buildSearchData(props.location.state.searchData);
            props.history.replace({ state: null });
        }
    });

    const handleSubmit = async query => {
        if(query) {
            setLoading(true);
            let foodBankUri = API_URL.FOODBANK_LIST;
            const { zip_code } = query;
            // Going to use axios for now
            try {
                const resp = await axios.get(foodBankUri, { params: { zip_code } });
                const { data } = resp;
                setFoodBankData(data);
                setFoodBankResponse(true);
                setLoading(false);
            } catch (err) {
                setServerError(true);
                setLoading(false);
            }
        }
    };


    const buildSearchData = (data) =>{
        if(Object.keys(data)[0]) {
            let searchDetails = {
                'street': data.searchData.street,
                'zip_code': data.searchData.zip,
            };
            setSearchDetails(searchDetails);
            handleSubmit(searchDetails);
        }

    };

    const ResourceList = () => {
        if (foodBankResponse) {
            return <ResourceListComponent dataToChild = {foodBankData} /> ;
        }
        if (serverError) {
            return <h2>Something went wrong</h2>
        }
        return null;
    };

    return (
        <div className="h-100">
            <div className="h-100 d-flex flex-column">
                <div className="sa-input-wrap text-left">
                    <SearchComponent onSelectedChild={buildSearchData}
                                     dataToChild={searchDetails} />
                    {loading &&
                    <div className="pt-4">
                        <ProgressBar animated now={100} data-testid="loading" />
                    </div>
                    }
                    {!loading && <ResourceList />}
                </div>
                <div className="sa-input-result-wrap text-left">
                    <div className="map-mobile mb-2" >
                        <img src={MapImage} className="img-fluid" />
                    </div>
                    <div className="list-view-detail">
                        <div className="list-view-detail-header p-3">
                            <div className="close-button text-right">
                                <a><img src={Close}/></a>
                            </div>
                            <div className="list-view-header-title">Kroger Food Pantry EXPRESS</div>
                            <div className="list-view-item-location d-flex justify-content-between">
                                <div className="list-view-item-name">Prepack Pantry</div>
                                <div className="list-view-item-distance">14 Miles</div>
                            </div>
                        </div>
                        <div className="list-view-detail-wrapper d-flex flex-column justify-content-between p-3">
                            <div className="flex-grow-1 list-view-detail-sub">
                                <div className="registration-required">
                                    <span className="registration-required-label">Registration Required</span>
                                </div>
                                <div className="timings d-flex justify-content-between">
                                    <div className="date-wrapper">Monday, 4/2/2020</div>
                                    <div className="timing-wrapper">12:30pm-3:30pm</div>
                                </div>
                                <div className="address-wrap">
                                    225 E Gates St,
                                    Columbus, OH 43206
                                    (321)456-0987
                                </div>
                                <div className="list-view-contents mt-4">
                                    <h3 className="list-view-content-title">
                                        Information
                                    </h3>
                                    <div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non erat vestibulum, bibendum risus non, gravida felis. Vestibulum vulputate vel odio hendrerit eleifend. Duis ut neque iaculis, aliquam neque eget, tempor nibh.
                                        </p>
                                        <p>
                                            Foodbank can add details to an event using an open form field. Light styling optins available (bold, italic, line breaks, ordered lists, preset text styles)
                                        </p>
                                    </div>
                                    <div className="image-view mt-3 mb-3">

                                    </div>
                                </div>
                            </div>
                            <div className="reserve-time">
                                <button type="submit" className="btn custom-button w-100">
                                    Reserve Time
                                </button>
                            </div>
                        </div>
                    </div>


                    <EventListContainer searchData={searchDetails} />
                </div>
                {/* sa-content-wrapper */}
            </div>

        </div>
    )

};

export default EventContainer;
