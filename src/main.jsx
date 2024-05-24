import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.scss';
import * as bootstrap from 'bootstrap';
import '@splidejs/react-splide/css';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import { API_URL } from './data/api';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Home from './components/modules/Home';
import Tickets from './components/modules/Tickets';

const sendToken = async (_token) => {
  if (!_token)
    return false;

  const { data } = await axios
    .get(`${API_URL}/session/verify/${_token}`)
    .catch(({ response }) => {
      const { data } = response;

      if (response.status !== '500')
        return false;
    });

  return true;
}

const validateLogin = async () => {
  const token = localStorage.getItem('token');
  const logged = await sendToken(token);

  if (logged)
    return redirect('/dashboard');

  return false;
}

const validateDashboard = async () => {
  const token = localStorage.getItem('token');
  const logged = await sendToken(token);

  if (!logged)
    return redirect('/');

  return true;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound />,
    loader: validateLogin,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    loader: validateDashboard,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'tickets',
        element: <Tickets />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
