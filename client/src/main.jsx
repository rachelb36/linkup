import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import React from 'react';
import { Link } from 'react-router-dom';
import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Events from './pages/Events.jsx';
import AddEvent from './pages/AddEvent.jsx';
import EditEvent from './pages/EditEvent.jsx';
import AdminEvents from './pages/AdminPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App component will wrap all other pages
    errorElement: <ErrorPage />, // Default error page
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      {
        path: 'admin',
        element: <AdminEvents />, 
          { index: true, element: <AdminEvents /> },

      // All users can access these routes
      { path: 'events', element: <Events /> },
    ],
  },
]);

// Render the app with RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
