
import React, { useState,useEffect,useContext } from 'react';
import SearchComponent from '../General/SearchComponent';
import ResourceListComponent from './ResourceListComponent';
import EventListContainer from './EventListContainer';
import { ProgressBar } from 'react-bootstrap';
import {API_URL} from '../../Utils/Urls';
import axios from 'axios';
import '../../Assets/scss/main.scss';
import MapImage from '../../Assets/img/map.jpg';
import EventDetailsComponent from './EventDetailsComponent';
import EventContext, { EventProvider } from '../../Store/ContextApi/EventContext';

const EventContainer = props => {
    const [foodBankResponse, setFoodBankResponse] = useState(false);
    let [foodBankData,setFoodBankData] = useState({});
    let [searchDetails,setSearchDetails] = useState({});
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(false);
    let {eventDetails} = useContext(EventContext);

    useEffect(() => {
        let isSearchData = !!props.location.state;
        if (isSearchData){
            buildSearchData(props.location.state.searchData);
            // props.history.replace({ state: null });
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
                    
                   {eventDetails? <EventDetailsComponent/>
                   :  
                   <EventListContainer searchData={searchDetails} />}

                   
                </div>
            </div>

        </div>
    )

};

export default EventContainer;
