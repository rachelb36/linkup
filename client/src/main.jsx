import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Login from './components/Login';
import SignUp from './pages/SignUp';
import Events from './pages/Events';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import AdminPage from './pages/AdminPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App component will wrap all other pages
    errorElement: <ErrorPage />, // Default error page
    children: [
      {
        index: true, // Default path "/"
        element: <Login />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
  
      {
        path: 'addevent',
        element: <AddEvent />,
      },
      {
        path: 'editevent',
        element: <EditEvent />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
]);

// Render the app with RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

