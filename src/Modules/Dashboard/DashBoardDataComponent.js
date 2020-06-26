import React from "react";
import { withRouter } from "react-router-dom";
import SearchComponent from "../General/SearchComponent";
import DashboardCreateAccountComponent from "./DashboardCreateAccountComponent";
import { useForm } from "react-hook-form";

const DashBoardDataComponent = props => {
  // Login is out of scope
  // const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('isLoggedIn'));

  // React.useEffect(()=>{
  //     if (localStorage.getItem('isLoggedIn')!=undefined ){
  //         setIsLoggedIn(true);
  //     }
  // },[localStorage.getItem('isLoggedIn')]);

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = data => {
    if (data) {
      props.history.push({
        pathname: "/events/list",
        state: { searchData: data },
      });
    }
  };

  return (
    <div className="container pt-150 pb-150">
      <div className="search-area text-left">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchComponent register={register} errors={errors} />
        </form>
      </div>

      <DashboardCreateAccountComponent />
    </div>
  );
};
export default withRouter(DashBoardDataComponent);
