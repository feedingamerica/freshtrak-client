import React from "react";
import Routes from "./Core/Routes";
import { useSelector } from 'react-redux';

// import "./Assets/scss/main.scss";
// import "./Assets/css/style.css";

const App = () => {
  React.useEffect(() => {}, []);
  const language = useSelector(state => state.language.language);
  return (
    <div className="App">
      <div className="main-wrapper">
        <Routes language={language}/>
      </div>
    </div>
  );
};

export default App;
