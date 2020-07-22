import React from 'react';
import ReactContent from '../react-content';

import './card.css';

function Card({ children }: any) {
  return (
    <div className="rnx-card">

      <div className="rnx-card__header">
        <ReactContent selector='slot=header' childs={children} />
      </div>

      <div className="rnx-card__content">
        <ReactContent selector='slot=content' childs={children} />
      </div>

      <div className="rnx-card__footer">
        <ReactContent selector='slot=footer' childs={children} />
      </div>
    </div>

  );
}

export default Card;
