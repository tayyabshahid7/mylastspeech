import React from 'react';
import Routes from './Components/Routes/Routes';
import 'font-awesome/css/font-awesome.min.css';
const trackingId = "UA-152994824-1";
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);
const App: React.FC = () => {
  
  return ( 
        <Routes/>
    )
}
export default App;
