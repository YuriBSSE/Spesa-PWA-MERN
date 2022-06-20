import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerMain from './CustomerComponents/main';
import MerchantAuth from './MerchantComponents/Auth';
import AdminPortal from './AdminComponents/main';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const promise = loadStripe("pk_test_51JgidXHATUuIHCc6wPziQEri4oCcO23W48G0RYyoA1xushcha4GD0i3n1wnvFGle8mKX1rVFasEqFOkj2PPA1Don00KJ5YFoTy");


const Routing = () => {
  return(
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Elements stripe={promise}>
          <Switch>
            <Route exact path= "/" component={CustomerMain}></Route>
            <Route exact path="/merchant" component={MerchantAuth}></Route>
            <Route exact path="/admin" component={AdminPortal}></Route>
          </Switch>
        </Elements>
      </div>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
