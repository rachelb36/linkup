import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import SignUp from './pages/SignUp';
import Events from './pages/Events';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import AdminPage from './pages/AdminPage';
import MemberList from './pages/MemberList';
import './index.css';

// Create a BrowserRouter instance
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',  // Define an explicit path for the homepage
        element: <Home />,
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
        path: 'users', // Assuming 'MemberList' is the intended user listing page
        element: <MemberList />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

// Render the app with RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
