import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './app/styles/common.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {createBrowserHistory} from 'history';
import {store, StoreContext} from './app/store/store';
import {Router} from 'react-router';
import Navbar from "./app/components/layout/Navbar";
import Footer from "./app/components/layout/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
        <Navbar/>
        <App />
        <Footer/>
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);

reportWebVitals();
