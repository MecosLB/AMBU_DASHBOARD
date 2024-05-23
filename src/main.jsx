import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.scss';
import * as bootstrap from 'bootstrap';
import Login from './views/Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
