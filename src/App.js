import React from "react";
import Routes from "./Core/Routes";
import { useSelector } from 'react-redux';

// import "./Assets/scss/main.scss";
// import "./Assets/css/style.css";

const App = () => {
  React.useEffect(() => {}, []);
  const language = useSelector(state => state.language.language);
  console.log("inside app routes app.js lan",language)
  return (
    <div className="App h-100">
      <div className="main-wrapper h-100">
        <Routes language={language}/>
      </div>
    </div>
  );
};

export default App;
