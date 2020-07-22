import React from 'react';

import './button.css';

function Button ({ children, onClick }: any) {
  return (
    <button className="rnx-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
