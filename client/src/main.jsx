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
import './index.css';

// Create a BrowserRouter instance

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App component will wrap all other pages
    errorElement: <ErrorPage />, // Default error page
    children: [
      {
        index: true,  
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
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: '*', // Catch-all route for undefined paths
        element: <ErrorPage />,
      },
    ],
  },
]);

// Render the app with RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

export default router;