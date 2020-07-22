import React from 'react';
import logo from '../../../../assets/images/logo.png';
import { Card, Button } from '../../../../shared';
import './login-modal.css';

function LoginModal() {
  // const name = 'Jonatan'

  // Handlers Functions
  // function create(event: React.KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     console.log('todo: logica!');
  //   }
  // }

  function join(e: React.MouseEvent) {
    e.preventDefault();
    console.log('join was clicked.');
  }

  // function createClick(e: React.MouseEvent) {
  //   e.preventDefault();
  //   console.log('create was clicked!');
  // }

  return (
    <Card>
      {/* Header */}
      <div slot="header" className="flex justify-center">
        <img src={logo} alt="RunoX logo" />
      </div>

      {/* Content */}
      <div slot="content" className="text-center">
        <div className="opacity-75 text-sm">SALA</div>

        {/* {name ? <h1 className="text-2xl font-semibold">{name}</h1> : null} */}

        {/* <input placeholder="Room name here ..." onKeyPress={create} /> */}

        <div className="mt-6">
          <Button onClick={join}>LOGIN & JOIN ROOM!</Button>

          {/* <Button onClick={createClick}>CREATE ROOM!</Button> */}

          {/* <Button onClick={createClick}>START THE GAME!</Button> */}

          {/* <div className="px-4 text-4xl text-red-700 font-semibold">
            WAITING FOR THE OWNER TO START THE GAME
          </div> */}
        </div>

      </div>

      {/* Footer */}
      <div slot='footer'>
        <div className="opacity-75 text-sm pb-2 mb-3 border-b border-gray-800">
          PLAYERS
        </div>

        <div className="text-gray-400 uppercase text-sm tracking-wider">
          Aún no se han añadido jugadores a la sala.
        </div>

      </div>
    </Card>

  );
}

export default LoginModal;
