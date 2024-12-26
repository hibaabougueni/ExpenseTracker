import React from 'react';
import ReactDOM from 'react-dom';

import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <Router>
  <App />
</Router>,
  document.getElementById('root')
);


