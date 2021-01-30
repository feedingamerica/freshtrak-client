import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchComponent from '../General/SearchComponent';
import DashboardCreateAccountComponent from './DashboardCreateAccountComponent';
import { useForm } from 'react-hook-form';
import {DEFAULT_DISTANCE} from '../../Utils/Constants'

const DashBoardDataComponent = props => {
  // Login is out of scope
  // const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('isLoggedIn'));

  // React.useEffect(()=>{
  //     if (localStorage.getItem('isLoggedIn')!=undefined ){
  //         setIsLoggedIn(true);
  //     }
  // },[localStorage.getItem('isLoggedIn')]);

  const { register, errors, handleSubmit } = useForm();
  const isFaceBookLoggedIn = localStorage.getItem('isLoggedIn');
  
  //Flag to turn off/on Home Page Container for Loggedin user feature
  if (isFaceBookLoggedIn === true){
    props.history.push({
      pathname: `/home`,
    }); 
  }

  const onSubmit = ({zip_code, distance}) => {
    let url = `/events/list/`;
    if (zip_code){
      url += zip_code + '/';
    }
    if (distance){
      url += distance + '/';
    }
    props.history.push({
      pathname: url
    });
  };

  return (
    <div className="container pt-150 pb-150">
      <div className="search-area text-left">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchComponent
            register={register}
            errors={errors}
            onSubmitHandler={onSubmit}
            range={DEFAULT_DISTANCE}
            enableFilter={false}
          />
        </form>
      </div>

      <DashboardCreateAccountComponent />
    </div>
  );
};
export default withRouter(DashBoardDataComponent);
