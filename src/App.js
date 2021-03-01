import React from "react";
import Routes from "./Core/Routes";
// import "./Assets/scss/main.scss";
// import "./Assets/css/style.css";

const App = () => {
  React.useEffect(() => {}, []);
  return (
    <div className="App h-100">
      <div className="main-wrapper h-100">
        <Routes />
      </div>
    </div>
  );
};

export default App;
