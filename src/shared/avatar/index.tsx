import React from 'react';

import './avatar.css';

function Avatar({ badge, name, image }: any) {
  return (
    <div className="rnx-avatar">
      {name ?
        <div className="rnx-avatar__name">
          { name }
        </div>: null
      }

      <div className="rnx-avatar__conatiner">
        <img src={image} className="rnx-avatar__image" alt="name" />

        {badge ?
          <div className="rnx-avatar__badge">
            {badge}
          </div> : null
        }
      </div>
    </div >

  );
}

export default Avatar;
