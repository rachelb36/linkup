import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  // Safely access properties, providing fallback values if necessary
  const status = error?.status || 'Unknown Error';
  const statusText = error?.statusText || 'An unexpected error occurred';
  const message = error?.message || 'Something went wrong.';

  return (
    <div>
      <h1>{status}</h1>
      <h2>{statusText}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
