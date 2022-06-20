import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerMain from './CustomerComponents/main';
import MerchantAuth from './MerchantComponents/Auth';
import './App.css';
  
class App extends Component {
  render() {
    return (
       <Router>
           <div className="App">
            <Switch>
              <Route exact path={process.env.PUBLIC_URL + '/'} component={CustomerMain}></Route>
              <Route path={process.env.PUBLIC_URL + '/merchant'} component={MerchantAuth}></Route>
            </Switch>
          </div>
       </Router>
   );
  }
}
  
export default App;