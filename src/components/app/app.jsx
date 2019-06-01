import React from 'react';
import { FmapiServiceProvider } from '../fmapi-service-context';
import FmpaiService from '../../services/fmapi-service';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';

import TransferMarket from '../transfer-market'
import AppHeader from '../app-header';
import HomePage from '../home-page';

import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'


const App = () => {

  const fmapiService = new FmpaiService();
  return (
    <Provider store={store}>
      <FmapiServiceProvider value={fmapiService}>
        <Router>
          <div className="app d-flex flex-column">
            <AppHeader />
            <Route exact path="/transfer-market" component={TransferMarket} />
            <Route exact path="/" component={HomePage} />
          </div>
        </Router>
      </FmapiServiceProvider>
    </Provider>
  )

};

export default App;
