import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  return (
    <div>
      <h4>
        No match for <code>{location.pathname}</code>
      </h4>
    </div>
  );
};

export default NotFound;
