import React from 'react';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();
  return (
    <div>
      hello this is the frontpage
      <button
        onClick={() => {
          history.push('/login');
        }}
      >
        Login
      </button>
    </div>
  );
};

export default HomePage;
